'use client'

import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

interface DropDownProps {
  defaultValue: string
  menuItems: string[]
}

export default function DropDown( { defaultValue, menuItems }: DropDownProps ) {

    const [ createdYear, setCreatedYear ] = useState(defaultValue)

    // eslint-disable-next-line
    const dropdownMenuClick = (e: any) => {
        setCreatedYear(e.target.text)
    }

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-1 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-200">
          {createdYear}
          <ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
        </MenuButton>
      </div>

      <MenuItems
        transition
        className="absolute left-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
        <div className="py-1">
          {
            menuItems.map(
              (e, i) => (
                <MenuItem key={"MI"+e+i}>
                  <a
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                    onClick={dropdownMenuClick}
                    key={"a"+e+i}
                  >
                    {e}
                  </a>
                </MenuItem>
              )
            )
            
          }
          
          {/* <form action="#" method="POST">
            <MenuItem>
              <button
                type="submit"
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
              >
                Sign out
              </button>
            </MenuItem>
          </form> */}
        </div>
      </MenuItems>
    </Menu>
  )
}