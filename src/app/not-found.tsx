"use client" // Runtime component

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpIcon } from "@/icons";

export default function NotFound() {
  const t = useTranslations(); // runtime çeviri

  return (
    <div className="flex flex-col gap-4 items-center justify-center min-h-[calc(100vh-64px)]">
      <h1 className="text-2xl-semi text-ui-fg-base">{t("NotFound")}</h1>
      <p className="text-small-regular text-ui-fg-base">
        {t("NotFoundMessage", "The page you tried to access does not exist.")}
      </p>
      <Link className="flex gap-x-1 items-center group" href="/">
        {t("GoToFrontpage", "Go to frontpage")}
        <ArrowUpIcon
          className="group-hover:rotate-45 ease-in-out duration-150"
          color="var(--fg-interactive)"
        />
      </Link>
    </div>
  );
}
