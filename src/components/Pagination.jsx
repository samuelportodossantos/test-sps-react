import { Button } from '@radix-ui/themes';
import { ArrowLeftIcon, ArrowRightIcon } from "@radix-ui/react-icons";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    const handlePrev = () => {
        if (currentPage > 1) onPageChange(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) onPageChange(currentPage + 1);
    };

    const renderPages = () => {
        const pages = [];
        for (let i = 1; i <= totalPages; i++) {
            pages.push(
                <Button
                    size={"1"}
                    key={i}
                    onClick={() => onPageChange(i)}
                    style={{background: i === currentPage ? 'rgba(255,255,255,.2)' : 'rgba(255,255,255,.1)'}}
                >
                    {i}
                </Button>
            );
        }
        return pages;
    };

    return (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '16px 0' }}>
            <Button size={"1"} onClick={handlePrev} disabled={currentPage === 1}>
                <ArrowLeftIcon />
            </Button>
            {renderPages()}
            <Button size={"1"} onClick={handleNext} disabled={currentPage === totalPages}>
                <ArrowRightIcon />
            </Button>
        </div>
    );
};

export default Pagination;
