import * as React from 'react';
import {Button, FormGroup} from '@mui/material';
import ButtonGroup from '@mui/material/ButtonGroup';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import {Controller} from "react-hook-form";
import {ItemCategory} from "../../types/table-data";

type ItemCategoriesDropdownProps = {
    categories: ItemCategory[];
    categoryId: number;
    onCategoryIdChange: (categoryId: number) => void;
}

function ItemCategoriesDropdown({categories, categoryId, onCategoryIdChange}: ItemCategoriesDropdownProps) {


    const [open, setOpen] = React.useState(false);

    const anchorRef = React.useRef<HTMLDivElement>(null);

    // determine the first selected item of the dropdown
    const indexOfSelectedCategory = findIndexOfDefaultCategory();

    function findIndexOfDefaultCategory() {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].id == categoryId) {
                return i;
            }
        }
        return 0;
    }


    // interactions onclick/toggle/close
    const handleMenuItemClick = (
        newId: number
    ) => {
        setOpen(false);
        onCategoryIdChange(newId)
    };
    const handleToggle = () => {

        setOpen((prevOpen) => !prevOpen);
    };
    const handleClose = (event: Event) => {

        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpen(false);

    };

    return (
        <FormGroup>
            <React.Fragment>
                <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button" >
                    {/*Selected Category*/}
                    <Button>{categories[indexOfSelectedCategory].name} </Button>
                    {/*Open Dropdown*/}
                    <Button
                        size="large"
                        aria-controls={open ? 'split-button-menu' : undefined}
                        aria-expanded={open ? 'true' : undefined}
                        aria-label="select merge strategy"
                        aria-haspopup="menu"
                        onClick={handleToggle}
                    >
                        <ArrowDropDownIcon/>
                    </Button>
                </ButtonGroup>
                {/*Input of popup and dropdown*/}
                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    transition
                >
                    {({TransitionProps, placement}) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom' ? 'center top' : 'center bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList id="split-button-menu" autoFocusItem>
                                        {categories.map((category, index) => (
                                            <MenuItem
                                                key={category.name}
                                                selected={index === indexOfSelectedCategory}
                                                onClick={() => handleMenuItemClick(category.id)}
                                            >
                                                {category.name}
                                            </MenuItem>
                                        ))}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </React.Fragment>
        </FormGroup>
    )
}

export default ItemCategoriesDropdown;
