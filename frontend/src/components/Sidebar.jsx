export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="sidebar-logo">V</div>
        <div>
          <div className="sidebar-title">Vault</div>
          <div className="sidebar-user">Anurag Yadav</div>
        </div>
      </div>

      <nav className="sidebar-section">
        <p className="sidebar-section-title">Main</p>
        <button className="sidebar-item sidebar-item-active">Dashboard</button>
        <button className="sidebar-item">Nexus</button>
        <button className="sidebar-item">Intake</button>
      </nav>

      <nav className="sidebar-section">
        <p className="sidebar-section-title">Services</p>
        <button className="sidebar-item">Pre-active</button>
        <button className="sidebar-item">Active</button>
        <button className="sidebar-item">Blocked</button>
        <button className="sidebar-item">Closed</button>
      </nav>

      <nav className="sidebar-section">
        <p className="sidebar-section-title">Invoices</p>
        <button className="sidebar-item sidebar-item-active">Proforma Invoices</button>
        <button className="sidebar-item">Final Invoices</button>
      </nav>
    </aside>
  );
}
