import { LinkHomeInfo } from "@/components/molecules/LinkHomeInfo";
import { Paper } from "@mantine/core";

export function HomePaper({ title, subtitle, icon, bgIconColor }: { title: string, subtitle: string, icon: React.ReactNode, bgIconColor: string }) {
    return (
        <Paper shadow='xl' p='md'>
            <div className="flow-root bg-white rounded-lg px-6 pb-8">
              <LinkHomeInfo title={title} subtitle={subtitle} icon={icon} bgIconColor={bgIconColor} />
            </div>
          </Paper>
    )
}