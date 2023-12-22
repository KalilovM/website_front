"use client"
import {Fragment} from 'react'
import Logo from "@/components/Logo";
import {Disclosure, Menu, Transition} from '@headlessui/react'
import userStore from "@/stores/userStore";
import Dinosaur from "@/public/dinosour.svg"


const navigation = [
  {name: 'Dashboard', href: '#', current: true},
  {name: 'Team', href: '#', current: false},
  {name: 'Projects', href: '#', current: false},
  {name: 'Calendar', href: '#', current: false},
]

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

// TODO: Validation using zod and react-hook-form
export default function Navbar() {
  const user = userStore((state) => state)

  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({open}) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button
                  className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5"/>
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={"block h-6 w-6"}
                         aria-hidden={"true"}>
                      <path
                        d="M5 5h2v2H5V5zm4 4H7V7h2v2zm2 2H9V9h2v2zm2 0h-2v2H9v2H7v2H5v2h2v-2h2v-2h2v-2h2v2h2v2h2v2h2v-2h-2v-2h-2v-2h-2v-2zm2-2v2h-2V9h2zm2-2v2h-2V7h2zm0 0V5h2v2h-2z"
                        fill="currentColor"/>
                    </svg>
                  ) : (
                    <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className={"block h-6 w-6"}
                         aria-hidden={"true"}>
                      <path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm16 5H4v2h16v-2z" fill="currentColor"/>
                    </svg>
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center hidden sm:block">
                  <Logo/>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 text-sm font-medium uppercase'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              {user.isAuthenticated ? (
              <div
                className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5"/>
                  <span className="sr-only">View notifications</span>
                  <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                    <path
                      d="M14 4V2h-4v2H5v2h14V4h-5zm5 12H5v-4H3v6h5v4h2v-4h4v2h-4v2h6v-4h5v-6h-2V6h-2v8h2v2zM5 6v8h2V6H5z"
                      fill="currentColor"/>
                  </svg>
                </button>

                {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-3">
                    <div>
                      <Menu.Button
                        className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5"/>
                        <span className="sr-only">Open user menu</span>
                        {/*Draw few samples of pixel avatar pictures*/}
                        <img
                          className="h-8 w-8 rounded-full bg-black"
                          src={user.avatar || Dinosaur.src}
                          alt=""
                        />
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items
                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none rounded-md">
                        <Menu.Item>
                          {({active}) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 uppercase')}
                            >
                              Your Profile
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({active}) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 uppercase')}
                            >
                              Settings
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({active}) => (
                            <a
                              href="#"
                              className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700 uppercase')}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>

              </div>
                ): (

                <a
                  href="/auth/signin"
                  className="flex justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Sign in
                </a>
              )}
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
