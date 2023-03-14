import { BUTTONS, EVENTS } from './consts'

export function navigate (href) {
  window.history.pushState({}, '', href)
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export function Link ({ target, to, ...props }) {
  const handleClick = (event) => {
    const isMainEvent = event.button === BUTTONS.primary // primary click
    const isModifiedEvent = event.metaKey || event.ctrlKey || event.shiftkey
    const isManageableEvent = target === undefined || target === 'self'

    if (isMainEvent && isManageableEvent && !isModifiedEvent) {
      event.preventDefault()
      navigate(to) // navegación con SPA
      window.scrollTo(0, 0)
    }
  }
  return <a onClick={handleClick} href={to} target={target} {...props} />
}