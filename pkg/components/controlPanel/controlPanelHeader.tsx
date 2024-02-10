"use client";
import SecondaryNavLink, { SecondaryNav } from "../shared/secondaryNavigation";
import ContorlPanelHeaderActions from "./contorlPanelHeaderActions";

export default function ControlPanelHeader() {
  return (
    <header className="flex justify-between items-center w-full z-10">
      <SecondaryNav>
        <SecondaryNavLink disabled link="/">
          Overview
        </SecondaryNavLink>
        <SecondaryNavLink link="products">Products</SecondaryNavLink>
        <SecondaryNavLink link="tickets">Tickets</SecondaryNavLink>
        <SecondaryNavLink disabled link="categories">
          Categoreis
        </SecondaryNavLink>
        <SecondaryNavLink link="stock">Stock</SecondaryNavLink>
      </SecondaryNav>
      <ContorlPanelHeaderActions />
    </header>
  );
}
