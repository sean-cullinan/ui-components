import React, { RefObject } from 'react'
import FocusTrap from 'focus-trap-react'
import { map } from 'lodash'
import moment, { Moment } from 'moment'
import uuid from 'uuid'
import { FontAwesomeIcon } from '../../Icons'
import {
  DefaultDropdownButton,
  StyledContentWrapper,
  StyledDropdownCustomContent,
  StyledDropdownSectionList
} from './subcomponents/style'
import { ISectionProps, Section } from './subcomponents/Section'
import { Popover, IPopoverPosition } from '../../Popovers'

interface IDropdownMenuState {
  isDropdownOpen: boolean
  dropdownId?: string
  lastClosedTime?: Moment
}

interface IDropdownMenuProps {
  /** What position on the parent to anchor relative to; 'auto' will find best position automatically */
  parentAnchorPosition?: IPopoverPosition | 'auto',
  /** What position on the dropdown itself to place at the anchor position; 'auto' will find best position automatically */
  dropdownAnchorPosition?: IPopoverPosition | 'auto',
  /** Any custom class names */
  className?: string,
  /** The sections to render in the dropdown */
  sections?: ISectionProps[],
  /**
   * The parent component that opens the dropdown and positions it on the page.
   * The callback is given a toggle menu prop which can be used to toggle the menu as needed.
   */
  toggleComponent?: (props: IDropdownMenuToggleComponentProps) => React.ReactElement<any>,
  /** Children to display as custom content instead of sections */
  children?: (props: IDropdownMenuChildrenProps) => React.ReactElement<any>
}

interface IDropdownMenuToggleComponentProps {
  /** Callback to toggle opening/closing menu */
  toggleMenu: () => void,
  /** Ref for the toggle component, to anchor on the page */
  toggleComponentRef: RefObject<any>,
  /** Aria props for opening the menu */
  ariaProps: {
    role: 'button',
    'aria-expanded': boolean,
    'aria-owns'?: string,
    'aria-haspopup': boolean
  }
}

interface IDropdownMenuChildrenProps {
  /** Callback to close the menu */
  closeMenu: () => void
}

class DropdownMenu extends React.Component<IDropdownMenuProps, IDropdownMenuState> {
  public static Section = Section
  public static DefaultDropdownButton = DefaultDropdownButton

  public static defaultProps: Partial<IDropdownMenuProps> = {
    toggleComponent: ({ toggleMenu, toggleComponentRef, ariaProps }) => (
      <DefaultDropdownButton
        innerRef={toggleComponentRef}
        onClick={toggleMenu}
        {...ariaProps}
      >
        <FontAwesomeIcon type='ellipsis-v' />
      </DefaultDropdownButton>
    )
  }

  public state: IDropdownMenuState = {
    isDropdownOpen: false
  }

  private toggleComponentRef: RefObject<any> = React.createRef()

  public render (): JSX.Element {
    return (
      <React.Fragment>
        {this.toggleComponent}
        {this.dropdownPopover}
      </React.Fragment>
    )
  }

  private openMenu = () => {
    const {
      isDropdownOpen,
      lastClosedTime
    } = this.state

    if (isDropdownOpen) {
      return
    }

    // Hack to prevent reopening the menu on the same click as closing it
    if (!lastClosedTime || (moment().diff(lastClosedTime) > 300)) {
      this.setState({
        isDropdownOpen: true,
        dropdownId: uuid.v4()
      })
    }
  }

  private close = () => {
    this.setState({
      isDropdownOpen: false,
      dropdownId: undefined,
      lastClosedTime: moment()
    })
  }

  private get toggleComponent () {
    const {
      isDropdownOpen,
      dropdownId
    } = this.state
    const { toggleComponent } = this.props

    return toggleComponent && toggleComponent({
      toggleMenu: this.openMenu,
      toggleComponentRef: this.toggleComponentRef,
      ariaProps: {
        role: 'button',
        'aria-expanded': isDropdownOpen,
        'aria-owns': dropdownId,
        'aria-haspopup': true
      }
    })
  }

  private get dropdownPopover (): JSX.Element | null {
    const {
      isDropdownOpen,
      dropdownId
    } = this.state

    const {
      className,
      parentAnchorPosition,
      dropdownAnchorPosition,
      children
    } = this.props

    return (
      <Popover
        id={dropdownId || ''}
        isOpen={isDropdownOpen}
        parentAnchorPosition={parentAnchorPosition}
        popoverAnchorPosition={dropdownAnchorPosition}
        parentRef={this.toggleComponentRef}
      >
        <FocusTrap
          active={isDropdownOpen}
          focusTrapOptions={{
            onDeactivate: this.close,
            initialFocus: document.body,
            clickOutsideDeactivates: true,
            returnFocusOnDeactivate: false
          }}
          tag='span'
        >
          <StyledContentWrapper
            className={className}
            role='menu'
          >
            {this.dropdownContent}
          </StyledContentWrapper>
        </FocusTrap>
        {children}
      </Popover>
    )
  }

  private get dropdownContent (): JSX.Element | JSX.Element[] {
    const {
      sections,
      children
    } = this.props

    if (!sections && children) {
      return (
        <StyledDropdownCustomContent>
          {children({ closeMenu: this.close })}
        </StyledDropdownCustomContent>
      )
    }

    return (
      <StyledDropdownSectionList>
        {this.dropdownSections}
      </StyledDropdownSectionList>
    )
  }

  private get dropdownSections (): JSX.Element[] {
    const {
      sections
    } = this.props

    return map(sections, (section, index) => {
      return (
        <Section
          key={index}
          __closeMenuCallback={this.close}
          {...section}
        />
      )
    })
  }
}

export {
  IDropdownMenuProps,
  IDropdownMenuToggleComponentProps,
  DropdownMenu
}
