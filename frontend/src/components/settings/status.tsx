import { useAuthContext } from "@/context/auth-context";
import { Loader2, User } from "lucide-react";
import React, { useState } from "react";

const Status = () => {
  const { isLoading, updateProfile, authUser } = useAuthContext();
  const [status, setStatus] = useState<string>(authUser?.status || "");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({ status });
  };

  return (
    <div className="flex flex-col gap-1">
      <h3 className="text-lg font-semibold mb-3 w-full">Status</h3>
      <div className="rounded-xl border border-base-300 overflow-hidden bg-base-100 shadow-lg">
        <div className="p-4 bg-base-200 mx-auto">
          <div className="px-5 py-5 bg-base-100 rounded-xl shadow-sm overflow-hidden">
            <div className="space-y-1.5">
              <div className="text-sm flex items-center gap-2">
                <User className="w-4 h-4" />
                What's you status?
              </div>

              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  className="flex-1 px-4 py-2.5 bg-base-200 rounded-lg input input-bordered"
                  placeholder="Going for a walk"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                />
                <button
                  className="btn btn-primary min-h-0 rounded-lg"
                  disabled={isLoading}
                >
                  {isLoading && <Loader2 className="h-5 w-5 animate-spin" />}
                  <p>Update</p>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Status;
