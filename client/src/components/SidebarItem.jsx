import { Nav } from 'react-bootstrap';

const SidebarItem = ({ href, icon: Icon, title, isActive = false }) => {
  // console.log(`Checking active state for ${href}:`, {
  //   currentPath: window.location.pathname,
  //   isActive,
  //   matches: window.location.pathname === href
  // });
  // console.log(window.location.pathname, href)
  return (
    <Nav.Link
      href={href}
      className={`d-flex align-items-center px-3 py-2 ${isActive ? 'active' : ''}`}
    >
      <Icon className="me-2" />
      <span>{title}</span>
    </Nav.Link>
  );
};

export default SidebarItem;