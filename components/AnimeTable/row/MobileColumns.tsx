import { MembersEpisodesColumns } from "./MembersEpisodesColumns";
import { TypeScoreColumns } from "./TypeScoreColumns";
import type { MobileColumnsProps } from "./props";
import React from "react";

export const MobileColumns: React.FC<MobileColumnsProps> = React.memo(({ visibleColumns, item }) => {
    if (visibleColumns === 'type-score') {
        return <TypeScoreColumns item={item} />;
    }
    return <MembersEpisodesColumns item={item} />;
  });

MobileColumns.displayName = 'MobileColumns';
