// Temporary placeholder - payment processing disabled for demo
export default function BillingManager() {
  return (
    <div className="p-6 text-center border rounded-lg bg-gray-50">
      <h3 className="text-lg font-semibold mb-2">Payment Processing</h3>
      <p className="text-gray-600 mb-4">
        Billing functionality will be enabled once payment providers are configured.
      </p>
      <div className="bg-blue-50 border border-blue-200 rounded p-4">
        <p className="text-sm text-blue-700">
          <strong>Demo Mode:</strong> All frontend functionality is operational. 
          Backend payment processing requires environment variables.
        </p>
      </div>
    </div>
  )
}