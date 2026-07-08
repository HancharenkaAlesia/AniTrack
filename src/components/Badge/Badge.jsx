import './Badge.scss'

const Badge = ({children, variant}) => {
  return (
    <span className={`badge badge--${variant.toLowerCase()}`}>
      {children}
    </span>
  )
}

export default Badge