import { useSettingsContext } from "../hooks/useSettingsContext"
import { images } from "../constants/images"
import classNames from "classnames"
import { BellRinging, CheckCircle, X } from "@phosphor-icons/react"

export default function Options() {
  const {
    setShowSettings,
    notificationPermission,
    setNotificationPermission,
    timeState,
    setTimeState,
  } = useSettingsContext()

  function requestForNotificationPermission() {
    if (!("Notification" in window)) {
      console.error("This browser does not support desktop notification")
    }

    if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          setNotificationPermission("granted")
          new Notification("Thank you for allowing notifications!")
        }
      })
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        return setShowSettings(false)
      }}
    >
      <header className="flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Settings</h2>

        <button
          type="button"
          className="bg-slate-200 p-1.5 rounded-full hover:bg-slate-300 inline-flex items-center gap-2 justify-center text-center aspect-square transition-colors font-semibold"
          onClick={() => setShowSettings(false)}
        >
          <X weight="bold" color="currentColor" size={16} />
        </button>
      </header>

      <main className="flex flex-col gap-4 mt-8">
        <label className="flex flex-col gap-1 font-semibold">
          <span>Name</span>
          <input
            // biome-ignore lint/a11y/noAutofocus: <explanation>
            autoFocus
            type="text"
            className="border border-slate-200 p-2 px-3 rounded-lg text-base font-normal tracking-normal bg-slate-50"
            placeholder="Your name"
            defaultValue={timeState.name}
            name="firstname"
            onChange={(e) => {
              return setTimeState((prev) => ({
                ...prev,
                name: e.target.value,
              }))
            }}
          />
        </label>

        <label className="flex flex-1 flex-col gap-1 font-semibold">
          <span>Default working time (in hours)</span>
          <input
            type="number"
            step={0.25}
            min={0.25}
            max={24}
            className="border border-slate-200 p-2 px-3 rounded-lg text-base font-normal tracking-normal bg-slate-50"
            placeholder="8 hours"
            defaultValue={timeState.workHours}
            name="workHours"
            onChange={(e) => {
              return setTimeState((prev) => ({
                ...prev,
                workHours: Number(e.target.value),
              }))
            }}
          />
        </label>

        <label className="flex flex-1 flex-col gap-1 font-semibold">
          <span>Default break time (in hours)</span>
          <input
            type="number"
            step={0.25}
            min={0}
            max={24}
            className="border border-slate-200 p-2 px-3 rounded-lg text-base font-normal tracking-normal bg-slate-50"
            placeholder="1 hour"
            defaultValue={timeState.breakHours}
            name="pause"
            onChange={(e) => {
              return setTimeState((prev) => ({
                ...prev,
                breakHours: Number(e.target.value),
              }))
            }}
          />
        </label>

        <label className="flex flex-col gap-1 font-semibold">
          <span>Background image</span>

          <fieldset className="grid grid-cols-4 gap-2">
            {images.map((image) => (
              <label
                key={image.imageUrl}
                className={classNames(
                  "flex overflow-hidden rounded-lg cursor-pointer hover:opacity-80 transition-all relative bg-slate-200 aspect-video focus-within:ring-2 focus-within:ring-blue-700 focus-within:ring-offset-1",
                )}
              >
                <input
                  type="radio"
                  name="background"
                  value={image.imageUrl}
                  className="sr-only"
                  onClick={() => {
                    setTimeState((prev) => ({
                      ...prev,
                      backgroundImage: image,
                    }))
                  }}
                />
                <img
                  loading="lazy"
                  src={image.imageUrl}
                  alt={`Background by ${image.creator}`}
                  className={classNames("object-cover w-full h-full", {
                    "opacity-30":
                      image.imageUrl === timeState.backgroundImage.imageUrl,
                  })}
                  width={146}
                  height={82}
                />
                {image.imageUrl === timeState.backgroundImage.imageUrl && (
                  <div className="absolute w-full h-full flex justify-center items-center">
                    <CheckCircle size={24} weight="bold" color="currentColor" />
                  </div>
                )}
              </label>
            ))}
          </fieldset>
        </label>

        {notificationPermission !== "granted" && (
          <button
            className="bg-slate-200 text-base tracking-normal px-4 py-2 rounded-lg hover:bg-slate-300 inline-flex items-center gap-2 justify-center text-center transition-colors disabled:hover:bg-green-200 disabled:bg-green-200"
            type="button"
            onClick={() => requestForNotificationPermission()}
          >
            <BellRinging weight="bold" color="currentColor" />
            Allow notifications
          </button>
        )}
      </main>
    </form>
  )
}
