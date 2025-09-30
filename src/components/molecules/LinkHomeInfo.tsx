import { LinkTitle } from "../atoms/LinkTitle";

import { LinkSubtitle } from "../atoms/LinkSubtitle";
import { LinkIcon } from "../atoms/LinkIcon";

export function LinkHomeInfo({ title, subtitle, icon, bgIconColor }: { title: string, subtitle: string, icon: React.ReactNode, bgIconColor: string }) {
    return (
        <div className="-mt-6">
                <div>
                  <LinkIcon icon={icon} bgColor={bgIconColor} />
                </div>
                <LinkTitle>
                  {title}
                </LinkTitle>
                <LinkSubtitle>
                  {subtitle}
                </LinkSubtitle>
        </div>
    )
}