import { ProjectUrl } from "@/constants/projectUrl";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useAggressivePrefetcher = () => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch(ProjectUrl.introduce.about.toString());
    router.prefetch(ProjectUrl.introduce.time.toString());
    router.prefetch(ProjectUrl.introduce.location.toString());
    router.prefetch(ProjectUrl.movies.toString());
    router.prefetch(ProjectUrl.news.toString());

    return () => {};
  }, [router]);
};
