export default function MaintenancePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        {/* Nxt Leads Logo/Branding */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Nxt Leads</h1>
          <div className="w-20 h-1 bg-blue-400 mx-auto"></div>
        </div>

        {/* Maintenance Message */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 border border-white/20">
          <div className="mb-6">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            
            <h2 className="text-2xl font-semibold text-white mb-4">
              System Maintenance
            </h2>
            
            <p className="text-blue-100 text-lg mb-4">
              We're currently upgrading our premium lead generation platform to serve you better.
            </p>
            
            <p className="text-blue-200 text-sm">
              Expected back online: <strong>Shortly</strong>
            </p>
          </div>

          {/* Contact Info */}
          <div className="border-t border-white/20 pt-6">
            <p className="text-blue-200 text-sm mb-3">
              Urgent inquiries? Contact our team:
            </p>
            <div className="space-y-2">
              <div className="text-blue-100">
                <strong>Email:</strong> support@nxtleads.org
              </div>
              <div className="text-blue-100">
                <strong>Status:</strong> Upgrading lead quality systems
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-blue-300 text-sm">
            Thank you for choosing Nxt Leads<br />
            Premium Lead Generation Platform
          </p>
        </div>
      </div>
    </div>
  )
}