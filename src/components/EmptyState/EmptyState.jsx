import { Link } from 'react-router-dom'
import './EmptyState.css'

function EmptyState({
  title,
  message,
  actionLabel,
  actionTo,
  secondaryActionLabel,
  secondaryActionTo,
}) {
  return (
    <div className="empty-state section-card">
      <div className="empty-state__eyebrow">Nexa</div>
      <h2 className="empty-state__title">{title}</h2>
      <p className="empty-state__message">{message}</p>

      {(actionLabel || secondaryActionLabel) && (
        <div className="empty-state__actions">
          {actionLabel && actionTo && (
            <Link className="button" to={actionTo}>
              {actionLabel}
            </Link>
          )}

          {secondaryActionLabel && secondaryActionTo && (
            <Link className="button button--ghost" to={secondaryActionTo}>
              {secondaryActionLabel}
            </Link>
          )}
        </div>
      )}
    </div>
  )
}

export default EmptyState
