import React from "react";
import { Menubar } from "primereact/menubar";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import "./NavBarStyle.scss";


export default function NavBar() {
  const itemRenderer = (item) => (
    <a className="flex align-items-center p-menuitem-link">
      <span className={item.icon} />
      <span className="mx-2">{item.label}</span>
      {item.badge && <Badge className="ml-auto" value={item.badge} />}
    </a>
  );
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      className: "menu-item",
    },
    {
      label: "Jobs",
      icon: "pi pi-briefcase",
      className: "menu-item",
    },
    {
      label: "Brows",
      icon: "pi pi-globe",
      className: "menu-item",
      badge: 3,
      template: itemRenderer,
    },
  ];

  const start = (
   <span className="text-xl font-bold span-class">My Application</span>
  );
  const end = (
    <div className="flex align-items-center gap-2">
      <Avatar
        image="https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png"
        shape="circle"
      />
    </div>
  );

  return (
    <div className="card">
      <Menubar start={start} model={items} end={end} className="p-4" />
    </div>
  );
}
