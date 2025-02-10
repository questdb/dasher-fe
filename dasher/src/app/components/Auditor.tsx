"use client";

import { Dialog, Transition } from '@headlessui/react';
import { Bars3Icon, MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import {
  ChartBarSquareIcon,
  Cog6ToothIcon,
  FolderIcon,
  GlobeAltIcon,
  ServerIcon,
  SignalIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';
import { Fragment, useEffect, useState } from 'react';

const navigation = [
  { name: 'Projects', href: '#', icon: FolderIcon, current: false },
  { name: 'Deployments', href: '#', icon: ServerIcon, current: false },
  { name: 'Audit Log', href: '#', icon: SignalIcon, current: true },
  { name: 'Domains', href: '#', icon: GlobeAltIcon, current: false },
  { name: 'Usage', href: '#', icon: ChartBarSquareIcon, current: false },
  { name: 'Settings', href: '#', icon: Cog6ToothIcon, current: false },
]
const teams = [
  { id: 1, name: 'QuestDB', href: '#', initial: 'Q', current: true },
]
const secondaryNavigation = [
  { name: 'Overview', href: '#', current: false },
  { name: 'Audit Log', href: '#', current: true },
  { name: 'Settings', href: '#', current: false },
]

// @TODO! Stretch goal...
// Can we make this more interesting?
const stats = [
  { name: 'Number of trades', value: 'boo' },
  { name: 'Average trade size', value: 'zerp', unit: 'USD' },
  { name: 'Daily volume', value: 'zergle', unit: 'USD' },
  { name: 'Weekly volume', value: 'bleat', unit: 'USD' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Auditor() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activityItems, setActivityItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [datasetSize, setDatasetSize] = useState('sample')  // 'sample', '1k', '100k', 'full'

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const response = await fetch(`/api/audit?size=${datasetSize}`)
        const data = await response.json()
        setActivityItems(data.items || [])
        setLoading(false)
      } catch (err) {
        setError(err.message)
        setLoading(false)
      }
    }
    fetchData()
  }, [datasetSize])

  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog as="div" className="relative z-50 xl:hidden" onClose={setSidebarOpen}>
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button type="button" className="-m-2.5 p-2.5" onClick={() => setSidebarOpen(false)}>
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <img
                        className="h-8 w-auto"
                        src="https://questdb.io/img/footer/questdb.svg"
                        alt="QuestDB"
                      />
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <a
                                  href={item.href}
                                  className={classNames(
                                    item.current
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                                  {item.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li>
                          <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                          <ul role="list" className="-mx-2 mt-2 space-y-1">
                            {teams.map((team) => (
                              <li key={team.name}>
                                <a
                                  href={team.href}
                                  className={classNames(
                                    team.current
                                      ? 'bg-gray-800 text-white'
                                      : 'text-gray-400 hover:text-white hover:bg-gray-800',
                                    'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                                  )}
                                >
                                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                    {team.initial}
                                  </span>
                                  <span className="truncate">{team.name}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="-mx-6 mt-auto">
                          <a
                            href="#"
                            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                          >
                            <img
                              className="h-8 w-8 rounded-full bg-gray-800"
                              src="https://avatars.githubusercontent.com/u/9484709?v=4"
                              alt=""
                            />
                            <span className="sr-only">Your profile</span>
                            <span aria-hidden="true">Jacques Chartier</span>
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <div className="hidden xl:fixed xl:inset-y-0 xl:z-50 xl:flex xl:w-72 xl:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-black/10 px-6 ring-1 ring-white/5">
            <div className="flex h-16 shrink-0 items-center">
              <img
                className="h-8 w-auto"
                src="https://questdb.io/img/footer/questdb.svg"
                alt="QuestDB"
              />
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <a
                          href={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                          {item.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400">Your teams</div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {teams.map((team) => (
                      <li key={team.name}>
                        <a
                          href={team.href}
                          className={classNames(
                            team.current
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:text-white hover:bg-gray-800',
                            'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'
                          )}
                        >
                          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                            {team.initial}
                          </span>
                          <span className="truncate">{team.name}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="-mx-6 mt-auto">
                  <a
                    href="#"
                    className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-white hover:bg-gray-800"
                  >
                    <img
                      className="h-8 w-8 rounded-full bg-gray-800"
                      src="https://avatars.githubusercontent.com/u/9484709?v=4"
                      alt=""
                    />
                    <span className="sr-only">Your profile</span>
                    <span aria-hidden="true">Jacques Chartier</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="xl:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-6 border-b border-white/5 bg-gray-900 px-4 shadow-sm sm:px-6 lg:px-8">
            <button type="button" className="-m-2.5 p-2.5 text-white xl:hidden" onClick={() => setSidebarOpen(true)}>
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-5 w-5" aria-hidden="true" />
            </button>

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <form className="flex flex-1" action="#" method="GET">
                <label htmlFor="search-field" className="sr-only">
                  Search
                </label>
                <div className="relative w-full">
                  <MagnifyingGlassIcon
                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-500"
                    aria-hidden="true"
                  />
                  <input
                    id="search-field"
                    className="block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 text-white focus:ring-0 sm:text-sm"
                    placeholder="Search..."
                    type="search"
                    name="search"
                  />
                </div>
              </form>
            </div>
          </div>

          <main>
            <header>
              <nav className="flex overflow-x-auto border-b border-white/10 py-4">
                <ul
                  role="list"
                  className="flex min-w-full flex-none gap-x-6 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 lg:px-8"
                >
                  {secondaryNavigation.map((item) => (
                    <li key={item.name}>
                      <a href={item.href} className={item.current ? 'text-indigo-400' : ''}>
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="flex flex-col items-start justify-between gap-x-8 gap-y-4 bg-gray-700/10 px-4 py-4 sm:flex-row sm:items-center sm:px-6 lg:px-8">
                <div>
                  <div className="flex items-center gap-x-3">
                    <div className="flex-none rounded-full bg-green-400/10 p-1 text-green-400">
                      <div className="h-2 w-2 rounded-full bg-current" />
                    </div>
                    <h1 className="flex gap-x-3 text-base leading-7">
                      <span className="font-semibold text-white">QuestDB</span>
                      <span className="text-gray-600">/</span>
                      <span className="font-semibold text-white">Audit Log</span>
                    </h1>
                  </div>
                  <p className="mt-2 text-xs leading-6 text-gray-400">Viewing trade data</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDatasetSize('1k')}
                    className={`rounded-md px-3 py-2 text-sm font-semibold text-white ${datasetSize === '1k'
                        ? 'bg-indigo-700 cursor-default'
                        : 'bg-indigo-500 hover:bg-indigo-400'
                      }`}
                  >
                    Load 1K Rows
                  </button>
                  <button
                    onClick={() => setDatasetSize('100k')}
                    className={`rounded-md px-3 py-2 text-sm font-semibold text-white ${datasetSize === '100k'
                        ? 'bg-indigo-700 cursor-default'
                        : 'bg-indigo-500 hover:bg-indigo-400'
                      }`}
                  >
                    Load 100K Rows
                  </button>
                  <button
                    onClick={() => setDatasetSize('full')}
                    className={`rounded-md px-3 py-2 text-sm font-semibold text-white ${datasetSize === 'full'
                        ? 'bg-indigo-700 cursor-default'
                        : 'bg-indigo-500 hover:bg-indigo-400'
                      }`}
                  >
                    Load All Rows
                  </button>
                </div>
              </div>

              {/* @TODO! Any cool stats to display? */}
              <div className="grid grid-cols-1 bg-gray-700/10 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat, statIdx) => (
                  <div
                    key={stat.name}
                    className={classNames(
                      statIdx % 2 === 1 ? 'sm:border-l' : statIdx === 2 ? 'lg:border-l' : '',
                      'border-t border-white/5 py-6 px-4 sm:px-6 lg:px-8'
                    )}
                  >
                    <p className="text-sm font-medium leading-6 text-gray-400">{stat.name}</p>
                    <p className="mt-2 flex items-baseline gap-x-2">
                      <span className="text-4xl font-semibold tracking-tight text-white">{stat.value}</span>
                      {stat.unit ? <span className="text-sm text-gray-400">{stat.unit}</span> : null}
                    </p>
                  </div>
                ))}
              </div>
            </header>

            <div className="border-t border-white/10 pt-11">
              <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">Latest activity</h2>
              {/* @TODO! 
                - Implement virtualization to handle >1.5B rows efficiently
                - Consider using react-virtual or similar library
                - Current implementation only shows first page of results
              */}
              <div className="mt-6 overflow-hidden">
                <table className="w-full border-collapse border-spacing-0">
                  <thead>
                    <tr>
                      <th className="py-3.5 pl-4 pr-8 text-left text-sm font-semibold text-white sm:pl-6 lg:pl-8">
                        Timestamp
                      </th>
                      <th className="py-3.5 pl-0 pr-8 text-left text-sm font-semibold text-white">
                        Symbol
                      </th>
                      <th className="py-3.5 pl-0 pr-8 text-left text-sm font-semibold text-white">
                        Price
                      </th>
                      <th className="py-3.5 pl-0 pr-8 text-left text-sm font-semibold text-white">
                        Amount
                      </th>
                      <th className="py-3.5 pl-0 pr-8 text-left text-sm font-semibold text-white">
                        Side
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={5} className="py-12 pl-4 text-center text-sm">
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-indigo-500"></div>
                            <div className="text-gray-400">Loading {datasetSize} records...</div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      activityItems.map((item) => (
                        <tr key={item.timestamp}>
                          <td className="py-4 pl-4 pr-8 text-sm sm:pl-6 lg:pl-8">
                            <div className="flex items-center gap-x-4">
                              <div className="truncate text-white">{new Date(item.timestamp).toLocaleString()}</div>
                            </div>
                          </td>
                          <td className="py-4 pl-0 pr-8 text-sm text-gray-400">
                            {item.symbol}
                          </td>
                          <td className="py-4 pl-0 pr-8 text-sm text-gray-400">
                            ${item.price.toFixed(2)}
                          </td>
                          <td className="py-4 pl-0 pr-8 text-sm text-gray-400">
                            {item.amount}
                          </td>
                          <td className="py-4 pl-0 pr-8 text-sm text-gray-400">
                            {item.side}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}
