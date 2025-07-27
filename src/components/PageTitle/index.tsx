import { memo } from 'react';
import { PageTitleProps } from '../../types/props.types';

const PageTitle = memo(({ title }: PageTitleProps) => {
    return (
        <div className="mt-4 text-center">
            <h1 className="text-2xl font-bold">{title}</h1>
        </div>
    );
});

PageTitle.displayName = 'PageTitle';

export default PageTitle;
