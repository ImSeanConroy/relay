import ChatPreview from "@/components/chat/chat-preview";
import Profile from "@/components/settings/profile";
import Status from "@/components/settings/status";
import Theme from "@/components/settings/theme";

const SettingsPage = () => {

  return (
    <div className="h-screen container mx-auto px-4 my-12 max-w-5xl">
      <div className="space-y-6">
        <Status />
        <Theme />
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <ChatPreview />
          </div>
          <div className="flex-1">
            <Profile />
          </div>
        </div>
      </div>
    </div>
  );
};
export default SettingsPage;
