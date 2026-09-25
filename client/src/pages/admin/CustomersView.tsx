import React, { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { trpc } from "@/lib/trpc";
import {
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Eye,
  Ban,
  CheckCircle,
  X,
  FileText,
  DollarSign,
  Pencil,
  Trash2,
  Lock,
} from "lucide-react";
import { toast } from "sonner";

export default function CustomersView() {
  const { admin } = useAdminAuth();
  const isSuperAdmin = admin?.role === "super_admin";
  const utils = trpc.useUtils();
  const [search, setSearch] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");
  const [activeCustomer, setActiveCustomer] = useState<any | null>(null);

  // Edit Customer Modal State
  const [editingCustomer, setEditingCustomer] = useState<any | null>(null);
  const [editCustName, setEditCustName] = useState("");
  const [editCustPhone, setEditCustPhone] = useState("");
  const [editCustEmail, setEditCustEmail] = useState("");
  const [editCustAddress, setEditCustAddress] = useState("");
  const [editCustStatus, setEditCustStatus] = useState<"active" | "disabled">("active");
  const [editCustNotes, setEditCustNotes] = useState("");

  const { data: rawCustomers = [], refetch, isLoading } = trpc.admin.customers.list.useQuery({
    search: search || undefined,
  });

  const customers = rawCustomers.filter(
    (c) => selectedStatus === "all" || c.status === selectedStatus
  );

  const { data: orders = [] } = trpc.admin.orders.list.useQuery();
  const updateCustomerMutation = trpc.admin.customers.update.useMutation();
  const deleteCustomerMutation = trpc.admin.customers.delete.useMutation();

  const openEditCustomer = (cust: any) => {
    setEditingCustomer(cust);
    setEditCustName(cust.name || "");
    setEditCustPhone(cust.phone || "");
    setEditCustEmail(cust.email || "");
    setEditCustAddress(cust.address || "");
    setEditCustStatus(cust.status === "disabled" ? "disabled" : "active");
    setEditCustNotes(cust.notes || "");
  };

  const handleSaveCustomer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCustomer) return;
    try {
      const updated = await updateCustomerMutation.mutateAsync({
        id: editingCustomer.id,
        name: editCustName.trim(),
        phone: editCustPhone.trim(),
        email: editCustEmail.trim() || undefined,
        address: editCustAddress.trim(),
        status: editCustStatus,
        notes: editCustNotes.trim() || undefined,
      });
      toast.success(`Customer "${editCustName}" updated successfully!`);
      setEditingCustomer(null);
      if (activeCustomer && activeCustomer.id === editingCustomer.id) {
        setActiveCustomer({
          ...activeCustomer,
          ...updated,
        });
      }
      refetch();
      utils.admin.customers.invalidate();
      utils.admin.dashboard.invalidate();
    } catch (err: any) {
      toast.error(err.message || "Failed to update customer");
    }
  };

  const handleDeleteCustomer = async (id: number, name: string) => {
    if (!isSuperAdmin) {
      toast.error("Permission denied: Only Super Admin can delete customers.");
      return;
    }
    if (
      !confirm(
        `Are you sure you want to permanently delete customer "${name}"? This action cannot be undone.`
      )
    ) {
      return;
    }
    try {
      await deleteCustomerMutation.mutateAsync({ id, adminRole: admin?.role });
      toast.success(`Customer "${name}" deleted successfully!`);
      if (activeCustomer?.id === id) {
        setActiveCustomer(null);
      }
      if (editingCustomer?.id === id) {
        setEditingCustomer(null);
      }
      refetch();
      utils.admin.customers.invalidate();
      utils.admin.dashboard.invalidate();
    } catch (err: any) {
      toast.error("Failed to delete customer");
    }
  };

  const handleToggleBlock = async (customer: any) => {
    const newStatus = customer.status === "disabled" ? "active" : "disabled";
    if (
      !confirm(
        `Are you sure you want to ${
          newStatus === "disabled" ? "disable" : "activate"
        } ${customer.name}?`
      )
    )
      return;

    try {
      await updateCustomerMutation.mutateAsync({
        id: customer.id,
        status: newStatus,
      });
      toast.success(`Customer is now ${newStatus}`);
      if (activeCustomer && activeCustomer.id === customer.id) {
        setActiveCustomer({ ...activeCustomer, status: newStatus });
      }
      refetch();
      utils.admin.customers.invalidate();
      utils.admin.dashboard.invalidate();
    } catch (err) {
      toast.error("Failed to update customer status");
    }
  };

  return (
    <AdminLayout
      pageTitle="Customers &amp; Buyer Profiles"
      breadcrumbs={[{ label: "Customers" }]}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Customer Directory &amp; Accounts
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            View customer order histories, lifetime spend, delivery addresses, and account statuses.
          </p>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="p-4 bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, phone, email, or city..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
          />
        </div>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="py-2 px-3 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none shrink-0"
        >
          <option value="all">All Statuses</option>
          <option value="active">Active Customers</option>
          <option value="blocked">Blocked Customers</option>
        </select>
      </div>

      {/* CUSTOMERS TABLE */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Contact Details</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Total Orders</th>
                <th className="py-3 px-4">Total Spent</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-slate-400">
                    Loading customers...
                  </td>
                </tr>
              ) : customers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-slate-400">
                    No customers found matching criteria.
                  </td>
                </tr>
              ) : (
                customers.map((cust) => (
                  <tr
                    key={cust.id}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 font-bold flex items-center justify-center text-xs shrink-0">
                          {cust.name ? cust.name.charAt(0).toUpperCase() : "C"}
                        </div>
                        <div>
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {cust.name}
                          </p>
                          <p className="text-[10px] text-slate-400">
                            Member since {new Date(cust.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <p className="text-slate-700 dark:text-slate-300 font-medium">
                        {cust.phone}
                      </p>
                      {cust.email && (
                        <p className="text-[11px] text-slate-400">{cust.email}</p>
                      )}
                    </td>

                    <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                      {cust.address || "Dhaka, Bangladesh"}
                    </td>

                    <td className="py-3 px-4 font-bold text-slate-800 dark:text-slate-200">
                      {cust.totalOrders} order{cust.totalOrders === 1 ? "" : "s"}
                    </td>

                    <td className="py-3 px-4 font-extrabold text-slate-900 dark:text-white">
                      ৳{cust.totalSpent.toLocaleString()}
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold capitalize ${
                          cust.status === "active"
                            ? "bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300"
                            : "bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300"
                        }`}
                      >
                        {cust.status}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => setActiveCustomer(cust)}
                          title="View Details"
                          className="px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-200 text-xs font-medium flex items-center gap-1 transition-colors"
                        >
                          <Eye size={13} />
                          <span>View</span>
                        </button>
                        <button
                          onClick={() => openEditCustomer(cust)}
                          title="Edit Customer"
                          className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 hover:bg-blue-100 text-blue-700 dark:text-blue-300 text-xs font-medium transition-colors"
                        >
                          <Pencil size={13} />
                        </button>
                        {isSuperAdmin ? (
                          <button
                            onClick={() => handleDeleteCustomer(cust.id, cust.name)}
                            title="Delete Customer (Super Admin)"
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-rose-100 hover:text-rose-600 text-slate-400 dark:text-slate-400 text-xs font-medium transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
                        ) : (
                          <button
                            disabled
                            title="Customer delete is restricted to Super Admin only"
                            className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800/50 text-slate-300 dark:text-slate-600 text-xs font-medium cursor-not-allowed opacity-50"
                          >
                            <Lock size={12} />
                          </button>
                        )}
                        <button
                          onClick={() => handleToggleBlock(cust)}
                          className={`p-1.5 rounded-lg transition-colors ${
                            cust.status === "disabled"
                              ? "text-emerald-600 hover:bg-emerald-50"
                              : "text-slate-400 hover:text-rose-600"
                          }`}
                          title={cust.status === "disabled" ? "Activate Customer" : "Disable Customer"}
                        >
                          {cust.status === "disabled" ? <CheckCircle size={14} /> : <Ban size={14} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CUSTOMER DETAIL MODAL */}
      {activeCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl my-8 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-600 text-white font-bold text-base flex items-center justify-center">
                  {activeCustomer.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {activeCustomer.name}
                  </h3>
                  <span
                    className={`inline-block px-2 py-0.2 rounded-full text-[10px] font-semibold uppercase ${
                      activeCustomer.status === "active"
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {activeCustomer.status}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setActiveCustomer(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-6 space-y-6 text-xs">
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border">
                  <span className="text-slate-500 block">Total Orders Placed</span>
                  <span className="text-xl font-black text-slate-900 dark:text-white mt-1 block">
                    {activeCustomer.totalOrders}
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border">
                  <span className="text-slate-500 block">Lifetime Spend</span>
                  <span className="text-xl font-black text-emerald-600 dark:text-emerald-400 mt-1 block">
                    ৳{activeCustomer.totalSpent.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Contact Info */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-800 dark:text-slate-200">Contact &amp; Delivery</h4>
                <div className="p-4 rounded-xl border bg-slate-50/50 dark:bg-slate-800/30 space-y-1.5">
                  <p className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <Phone size={14} className="text-emerald-600" />
                    <span>{activeCustomer.phone}</span>
                  </p>
                  {activeCustomer.email && (
                    <p className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                      <Mail size={14} className="text-emerald-600" />
                      <span>{activeCustomer.email}</span>
                    </p>
                  )}
                  <p className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                    <MapPin size={14} className="text-emerald-600" />
                    <span>
                      {activeCustomer.address || "N/A"}, {activeCustomer.district},{" "}
                      {activeCustomer.division}
                    </span>
                  </p>
                  {activeCustomer.notes && (
                    <p className="pt-2 text-slate-500 border-t border-slate-200 dark:border-slate-700">
                      <strong>Notes:</strong> {activeCustomer.notes}
                    </p>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                {isSuperAdmin ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteCustomer(activeCustomer.id, activeCustomer.name)}
                    className="px-4 py-2 bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400 hover:bg-rose-100 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 size={14} />
                    <span>Delete Profile</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                    <Lock size={12} />
                    <span>Delete is Super Admin only</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => openEditCustomer(activeCustomer)}
                    className="px-4 py-2 bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 hover:bg-blue-100 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Pencil size={14} />
                    <span>Edit Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleBlock(activeCustomer)}
                    className={`px-4 py-2 rounded-xl font-semibold text-xs transition-colors ${
                      activeCustomer.status === "disabled"
                        ? "bg-emerald-600 text-white hover:bg-emerald-500"
                        : "bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 hover:bg-amber-100"
                    }`}
                  >
                    {activeCustomer.status === "disabled" ? "Activate Customer" : "Disable Customer"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EDIT CUSTOMER MODAL */}
      {editingCustomer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl w-full max-w-lg my-8 overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Pencil size={16} className="text-blue-600" />
                <span>Edit Customer: {editingCustomer.name}</span>
              </h3>
              <button
                onClick={() => setEditingCustomer(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-lg"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveCustomer} className="p-6 space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Customer Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editCustName}
                  onChange={(e) => setEditCustName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="text"
                    required
                    value={editCustPhone}
                    onChange={(e) => setEditCustPhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Account Status
                  </label>
                  <select
                    value={editCustStatus}
                    onChange={(e) => setEditCustStatus(e.target.value as "active" | "disabled")}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="active">Active</option>
                    <option value="disabled">Disabled / Blocked</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editCustEmail}
                  onChange={(e) => setEditCustEmail(e.target.value)}
                  placeholder="customer@example.com"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Delivery Address
                </label>
                <textarea
                  rows={2}
                  value={editCustAddress}
                  onChange={(e) => setEditCustAddress(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Admin Internal Notes
                </label>
                <textarea
                  rows={2}
                  value={editCustNotes}
                  onChange={(e) => setEditCustNotes(e.target.value)}
                  placeholder="e.g. VIP customer, calls before ordering..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
                {isSuperAdmin ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteCustomer(editingCustomer.id, editingCustomer.name)}
                    className="px-4 py-2 bg-rose-50 text-rose-600 dark:bg-rose-950 dark:text-rose-400 hover:bg-rose-100 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors"
                  >
                    <Trash2 size={14} />
                    <span>Delete</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500">
                    <Lock size={12} />
                    <span>Delete is Super Admin only</span>
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setEditingCustomer(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={updateCustomerMutation.isPending}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-semibold shadow-xs disabled:opacity-50"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
