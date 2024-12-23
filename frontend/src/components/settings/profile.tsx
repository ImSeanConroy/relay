import { useAuthContext } from "@/context/auth-context";
import { Mail, User } from "lucide-react";

const Profile = () => {
  const { authUser } = useAuthContext();

  return (
    <div>
      <h3 className="text-lg font-semibold mb-3 w-full">Profile</h3>
      <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
        <div className="p-4 bg-base-200">
          <div className="max-w-lg mx-auto">
            <div className="px-5 py-5 bg-base-100 rounded-xl shadow-sm overflow-hidden">
              <div className="max-w-lg mx-auto">
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <div className="text-sm flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Full Name
                    </div>
                    <p className="px-4 py-2.5 bg-base-200 rounded-lg input input-bordered">
                      {authUser?.fullname}
                    </p>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-sm flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </div>
                    <p className="px-4 py-2.5 bg-base-200 rounded-lg input input-bordered">
                      {authUser?.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-5 bg-base-100 rounded-xl p-4">
              <div className="text-sm">
                <div className="flex items-center justify-between pb-2 border-b border-zinc-700">
                  <span>Member Since</span>
                  <span>{authUser?.createdAt?.split("T")[0]}</span>
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
    </div>
  );
};

export default Profile;
