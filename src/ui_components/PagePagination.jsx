import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination"

const PagePagination = ({ numberOfPages, handleSetPage, page, increasePageValue, decreasePageValue }) => {

    const numbers = Array.from({length:numberOfPages}, (_, index) => index+1) // it create an array of 4 empty values.
    // console.log(numbers);

    const firstNumber = numbers[0];
    const lastNumber = numbers[numbers.length - 1]
    
    return (
        <Pagination className=" dark:text-white">
            <PaginationContent className="gap-x-4 mb-4">
                {/* prev btn */}
                {page === firstNumber ||
                    <PaginationItem onClick={decreasePageValue}>
                        <PaginationPrevious href="#"/>
                    </PaginationItem>
                }

                {numbers.map((num) => (<PaginationItem key={num} onClick={() => handleSetPage(num)}>
                    {num === page ? <PaginationLink href="#" isActive>{num}</PaginationLink> : <PaginationLink href="#">{num}</PaginationLink>}
                    
                </PaginationItem> ))}

                {/* <PaginationItem>
                    <PaginationEllipsis />
                </PaginationItem> */}

                {/* we're doing conditional rendering here, if left side condition is true then react will not render right side, if false then it rneders right side */}
                { page === lastNumber ||
                    <PaginationItem>
                        <PaginationNext href="" />
                    </PaginationItem>
                }
            </PaginationContent>
        </Pagination>
    )
}

export default PagePagination