"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Loader2, UserRound, Mail, Save } from "lucide-react";
import { updateProfileName } from "@/app/actions/profile-action";

export default function ProfileClient({ user }: { user: any }) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);

  const [currentName, setCurrentName] = useState(user.name || "");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);

    const formData = new FormData(e.currentTarget);
    const res = await updateProfileName(formData);

    if (res?.error) {
      toast.error(res.error);
      setCurrentName(user.name);
    } else {
      toast.success("Profile updated successfully!");
      // Me-refresh router akan memicu layout mengambil data terbaru dari database
      router.refresh();
    }

    setIsUpdating(false);
  };

  return (
    <section className="max-w-4xl mx-auto px-4 pb-28 pt-34 md:pt-38">
      <div className="bg-white p-8 sm:p-10 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
        <h1 className="text-3xl font-bold text-text mb-2 relative z-10">Profile Settings</h1>
        <p className="text-sm text-text/60 mb-10 relative z-10">Update your personal account information here.</p>

        <div className="flex flex-col sm:flex-row gap-8 items-start relative z-10">
          <div className="w-28 h-28 bg-primary text-white rounded-full flex items-center justify-center text-4xl font-bold shadow-lg shadow-primary/20 shrink-0 mx-auto sm:mx-0">{currentName?.charAt(0).toUpperCase()}</div>

          <form onSubmit={handleSubmit} className="flex-1 w-full space-y-6">
            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-text/60 uppercase tracking-wider flex items-center gap-2">
                <UserRound className="w-4 h-4" /> Full Name
              </label>
              <input
                type="text"
                name="name"
                value={currentName}
                onChange={(e) => setCurrentName(e.target.value)}
                required
                placeholder="Enter your name..."
                className="w-full border border-gray-200 rounded-xl p-4 bg-background text-sm font-semibold text-text focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-text/60 uppercase tracking-wider flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address <span className="text-danger lowercase tracking-normal font-normal text-[10px] ml-auto">(Cannot be changed)</span>
              </label>
              <input type="email" value={user.email} disabled className="w-full border border-gray-200 rounded-xl p-4 bg-gray-100 text-sm font-semibold text-text/50 outline-none cursor-not-allowed" />
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="submit"
                disabled={isUpdating}
                className="w-full sm:w-auto bg-primary text-white px-8 py-3.5 rounded-xl font-bold shadow-lg shadow-primary/30 hover:bg-secondary transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
              >
                {isUpdating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                {isUpdating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
