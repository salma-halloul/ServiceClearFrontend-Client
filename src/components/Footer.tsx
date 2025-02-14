
export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-16 pb-8">
    <div className="mx-auto lg:px-20 px-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-bold mb-4">Cleaning Service</h3>
          <p className="text-gray-400">Professional cleaning solutions for homes and businesses.</p>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Services</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Residential Cleaning</li>
            <li>Commercial Cleaning</li>
            <li>Deep Cleaning</li>
            <li>Move In/Out Cleaning</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-400">
            <li>123 Cleaning Street</li>
            <li>New York, NY 10001</li>
            <li>contact@cleaningservice.com</li>
            <li>(555) 123-4567</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-semibold mb-4">Hours</h4>
          <ul className="space-y-2 text-gray-400">
            <li>Monday - Friday: 8am - 6pm</li>
            <li>Saturday: 9am - 4pm</li>
            <li>Sunday: Closed</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
        <p>&copy; 2024 Cleaning Service. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}