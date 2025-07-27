import '../styles/shared.css';

interface PageTitleProps {
    title: string;
}

export const PageTitle = ({ title }: PageTitleProps) => {
    return <h1 className="page-title">{title}</h1>;
};
