import './PageHeader.css'

function PageHeader({ eyebrow, title, subtitle }) {
  return (
    <header className="page-header">
      <div>
        {eyebrow && <p className="page-header__eyebrow">{eyebrow}</p>}
        <h1 className="section-title">{title}</h1>
      </div>

      {subtitle && <p className="page-header__subtitle section-subtitle">{subtitle}</p>}
    </header>
  )
}

export default PageHeader
