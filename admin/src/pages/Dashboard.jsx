import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  UserIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  CogIcon,
  FolderIcon,
  ChatBubbleLeftIcon,
  CurrencyDollarIcon,
} from '@heroicons/react/24/outline'

const stats = [
  { name: 'About Info', value: '1', icon: UserIcon, href: '/about', color: 'bg-blue-500' },
  { name: 'Education Records', value: '3', icon: AcademicCapIcon, href: '/education', color: 'bg-green-500' },
  { name: 'Work Experience', value: '3', icon: BriefcaseIcon, href: '/experience', color: 'bg-purple-500' },
  { name: 'Skills', value: '6', icon: CogIcon, href: '/skills', color: 'bg-orange-500' },
  { name: 'Portfolio Items', value: '4', icon: FolderIcon, href: '/portfolio', color: 'bg-red-500' },
  { name: 'Services', value: '4', icon: CogIcon, href: '/services', color: 'bg-indigo-500' },
  { name: 'Testimonials', value: '6', icon: ChatBubbleLeftIcon, href: '/testimonials', color: 'bg-pink-500' },
  { name: 'Pricing Plans', value: '3', icon: CurrencyDollarIcon, href: '/pricing', color: 'bg-teal-500' },
]

const Dashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <>
      {/* Header */}
      <div className="md:flex md:items-center md:justify-between">
        <div className="flex-1 min-w-0">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
            Dashboard
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Welcome back! Here's what's happening with your portfolio.
          </p>
        </div>
        <div className="mt-4 md:mt-0 md:ml-4">
          <div className="text-sm text-gray-500">
            {currentTime.toLocaleDateString()} - {currentTime.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Stats grid */}
      <div className="mt-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="relative bg-white pt-5 px-4 pb-12 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              <dt>
                <div className={`absolute rounded-md p-3 ${item.color}`}>
                  <item.icon className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <p className="ml-16 text-sm font-medium text-gray-500 truncate">{item.name}</p>
              </dt>
              <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                <p className="text-2xl font-semibold text-gray-900">{item.value}</p>
                <div className="absolute bottom-0 inset-x-0 bg-gray-50 px-4 py-4 sm:px-6">
                  <div className="text-sm">
                    <span className="text-primary-600 font-medium hover:text-primary-500">
                      View all<span className="sr-only"> {item.name} stats</span>
                    </span>
                  </div>
                </div>
              </dd>
            </Link>
          ))}
        </div>
      </div>

      {/* Quick actions */}
      <div className="mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            to="/portfolio"
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <div className="flex-shrink-0">
              <FolderIcon className="h-10 w-10 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">Add New Project</p>
              <p className="text-sm text-gray-500 truncate">Showcase your latest work</p>
            </div>
          </Link>

          <Link
            to="/testimonials"
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <div className="flex-shrink-0">
              <ChatBubbleLeftIcon className="h-10 w-10 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">Add Testimonial</p>
              <p className="text-sm text-gray-500 truncate">Share client feedback</p>
            </div>
          </Link>

          <Link
            to="/about"
            className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <div className="flex-shrink-0">
              <UserIcon className="h-10 w-10 text-gray-400" />
            </div>
            <div className="flex-1 min-w-0">
              <span className="absolute inset-0" aria-hidden="true" />
              <p className="text-sm font-medium text-gray-900">Update Profile</p>
              <p className="text-sm text-gray-500 truncate">Edit your about information</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Recent activity placeholder */}
      <div className="mt-8">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">System Status</h3>
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <div className="h-3 w-3 bg-green-400 rounded-full"></div>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">All systems operational</p>
                <p className="text-sm text-gray-500">Backend API is connected and responsive</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard