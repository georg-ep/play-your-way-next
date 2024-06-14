import { useSweepstakeStore } from "@/stores/sweepstake";
import { BreadcrumbItem, Breadcrumbs, Spinner } from "@nextui-org/react";
import { usePathname, useRouter } from "next/navigation";

export default function SweepstakeBreadcrumbs() {
  const { currentSweepstake: sweepstake, privateLeague } = useSweepstakeStore();
  const router = useRouter();
  const path = usePathname();

  const isLeague = () => {
    return path.includes("league");
  };

  const name = () => {
    return isLeague() ? privateLeague?.name : sweepstake?.name;
  };

  return (
    <Breadcrumbs variant="solid" key="crumbs" size="md" className="mb-8">
      <BreadcrumbItem onPress={() => router.push("/")}>
        {isLeague() ? "Leagues" : "Sweepstakes"}
      </BreadcrumbItem>
      <BreadcrumbItem>
        {name() ?? <Spinner size="sm" color="default" />}
      </BreadcrumbItem>
    </Breadcrumbs>
  );
}
