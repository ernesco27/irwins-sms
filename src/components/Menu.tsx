"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type MenuItem = {
  icon: string;
  label: string;
  href: string;
  visible: string[];
};

type MenuGroup = {
  title: string;
  items: MenuItem[];
};

type MenuProps = {
  menuItems: MenuGroup[];
  role: string;
};

const Menu = ({ menuItems, role }: MenuProps) => {
  const pathname = usePathname();

  return (
    <div className="mt-4 text-sm px-4">
      {menuItems.map((item) => {
        return (
          <div className="flex flex-col gap-2" key={item.title}>
            <span className="hidden lg:block text-gray-400 font-light my-4">
              {item.title}
            </span>
            {item.items.map((i) => {
              if (i.visible.includes(role)) {
                //const isActive = pathname.startsWith(i.href);
                // const isActive =
                //   pathname === i.href ||
                //   (i.href !== "/" && pathname.startsWith(i.href));

                const isActive =
                  pathname === i.href ||
                  pathname.startsWith(i.href + "/") ||
                  (i.href === "/admin" && pathname.startsWith("/admin"));
                return (
                  <Link
                    href={i.href}
                    key={i.label}
                    className={`${
                      isActive ? "bg-irwinSky  hover:text-blue-500" : ""
                    } flex items-center justify-center lg:justify-start gap-4 text-gray-500 py-2 rounded-md hover:bg-irwinSkyLight md:px-2`}
                  >
                    <Image src={i.icon} alt="" width={20} height={20} />
                    <span className="hidden lg:block text-lg">{i.label}</span>
                  </Link>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Menu;
