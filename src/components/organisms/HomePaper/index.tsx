import { LinkHomeInfo } from "@/components/molecules/LinkHomeInfo";
import { Paper } from "@mantine/core";
import Link from "next/link";

export function HomePaper({ title, subtitle, icon, bgIconColor, link }: { title: string, subtitle: string, icon: React.ReactNode, bgIconColor: string, link: string }) {
    return (
        <Link href={link}>
        <Paper shadow='xl' p='md'>
            <div className="flow-root bg-white rounded-lg px-6 pb-8">
              <LinkHomeInfo title={title} subtitle={subtitle} icon={icon} bgIconColor={bgIconColor} link={link} />
            </div>
          </Paper>
        </Link>
    )
}