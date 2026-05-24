import { useManagementDashboard } from "../../hooks/dashboard/useManagementDashboard";

type Props = {
  role: "DIRECTEUR" | "ADMIN";
};

export default function ManagementDashboard({
  role,
}: Props) {
  const { title, description, stats } =
    useManagementDashboard(role);

  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-900">
          {title}
        </h1>

        <p className="mt-2 text-slate-500">
          {description}
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Icon size={22} />
              </div>

              <p className="text-sm text-slate-500">
                {stat.title}
              </p>

              <p className="mt-2 text-2xl font-bold text-slate-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </section>
    </div>
  );
}