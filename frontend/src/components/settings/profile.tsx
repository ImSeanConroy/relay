import { useAuthContext } from "@/context/auth-context";
import { Loader2, Mail, User } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const { authUser, isLoading, updateProfile } = useAuthContext();

  const [fullname, setFullname] = useState<string>(authUser?.fullname || "");
  const [email, setEmail] = useState<string>(authUser?.email || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ fullname, email });
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 w-full">Profile</h3>
      <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
        <div className="p-4 bg-base-200">
          <div className="px-5 py-5 bg-base-100 rounded-xl shadow-sm overflow-hidden">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="space-y-1.5">
                <div className="text-sm flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <input
                  type="text"
                  className="px-4 py-2.5 bg-base-200 w-full rounded-lg input input-bordered"
                  placeholder="John Doe"
                  value={fullname}
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <div className="text-sm flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <input
                  type="text"
                  className="px-4 py-2.5 bg-base-200 w-full rounded-lg input input-bordered"
                  placeholder="johndoe@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div>
                <button
                  className="btn btn-primary min-h-0 rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
                  <p>Update</p>
                </button>
              </div>
            </form>
          </div>

          <div className="mt-5 bg-base-100 rounded-xl p-4">
            <div className="text-sm">
              <div className="flex items-center justify-between pb-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser?.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Email Verified</span>
                <span className="text-red-500">False</span>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
