import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

export default function MainLayout({ children }) {
  return (
    <div className="bg-surface font-body-md text-on-surface min-h-screen">
      <Sidebar />
      <div className="pr-64">
        <Topbar />
        <main className="relative pt-16 bg-surface w-full px-margin">
          {children}
        </main>
      </div>
    </div>
  );
}
