import { Outlet } from 'react-router-dom'

export function Layout() {
  return (
    <div id="top-level-component" className="min-w-[744px] border">
      <Outlet />
    </div>
  )
}
