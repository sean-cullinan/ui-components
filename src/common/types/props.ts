import { Variables } from '..'

// tslint:disable-next-line:no-namespace
namespace Props {
  export enum Position {
    Left = 'left',
    Right = 'right',
    Center = 'center',
    Top = 'top',
    Bottom = 'bottom',
    Auto = 'auto'
  }

  export interface IPositionXY {
    xPos: Position.Left | Position.Right,
    yPos: Position.Top | Position.Bottom
  }

  export type Margin = Variables.Spacing | Variables.Layout | {
    min?: Variables.Spacing | Variables.Layout | 'none'
    tablet?: Variables.Spacing | Variables.Layout | 'none'
    desktop?: Variables.Spacing | Variables.Layout | 'none'
    bigDesktop?: Variables.Spacing | Variables.Layout | 'none'
  }

  export interface IMargins {
    top?: Margin
    bottom?: Margin
    left?: Margin
    right?: Margin
  }

  export interface IShowForSizes {
    upper?: Variables.Breakpoint
    lower?: Variables.Breakpoint
  }

  export enum Size {
    XXSmall = 'xxsmall',
    XSmall = 'xsmall',
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
    XLarge = 'xlarge',
    XXLarge = 'xxlarge'
  }

  export enum AvatarSize {
    Small = 'small',
    Medium = 'medium',
    Large = 'large',
    XLarge = 'xlarge'
  }

  export enum TypographyType {
    XSmall = 'xsmall',
    Small = 'small',
    Body = 'body',
    Heading = 'heading',
    Display = 'display',
    DisplayLarge = 'display-large'
  }

  export enum ComponentType {
    AnnotatedSection = 'annotated_section',
    AsyncDataTable = 'async_data_table',
    AvatarBoard = 'avatar_board',
    AvatarGroup = 'avatar_group',
    AvatarTile = 'avatar_tile',
    BlockTabGroup = 'block_tab_group',
    Board = 'board',
    Breadcrumb = 'breadcrumb',
    BreadcrumbGroup = 'breadcrumb_group',
    Brick = 'brick',
    Button = 'button',
    ButtonGroup = 'button_group',
    ButtonIcon = 'button_icon',
    Callout = 'callout',
    Card = 'card',
    Carousel = 'carousel',
    CheckboxInput = 'checkbox_input',
    Comparison = 'comparison',
    EmptyState = 'empty_state',
    FilterController = 'filter_controller',
    FilterTag = 'filter_tag',
    FontAwesomeIconButton= 'font_awesome_icon_button',
    GridLayout = 'grid_layout',
    GridLayoutCell = 'grid_layout_cell',
    GroupCard = 'group_card',
    HighlightArea = 'highlight_area',
    HintWrapper = 'hint_wrapper',
    HorizontalRule = 'horizontal_rule',
    Icon = 'icon',
    IconPicker = 'icon_picker',
    LayoutSpacer = 'layout_spacer',
    LayoutSpacerItem = 'layout_spacer_item',
    LinkButton = 'link_button',
    NumberInput = 'number_input',
    PaginationButtons = 'pagination_buttons',
    PaginationDetails = 'pagination_details',
    Popover = 'popover',
    RadioInput = 'radio_input',
    Record = 'record',
    RecordName = 'record_name',
    ScrollingTabGroup = 'scrolling_tab_group',
    Section = 'section',
    SectionList = 'section_list',
    SmartList = 'smart_list',
    SmartListColumn = 'smart_list_column',
    Statistic = 'statistic',
    Table = 'table',
    TenorGifSelector = 'tenor_gif_selector',
    Text = 'text',
    TextAreaInput = 'text_area_input',
    TextInput = 'text_input',
    TelephoneText = 'telephone_text',
    Tile = 'tile',
    Timeline = 'timeline',
    TimelineEvent = 'timeline_event',
    TitledSection = 'titled_section',
    ToggleSwitch = 'toggle_switch',
    ToggleSwitchInput = 'toggle_switch_input',
    UnstyledSection = 'unstyled_section'
  }

  export enum Orientation {
    Vertical = 'vertical',
    Horizontal = 'horizontal'
  }

  export enum HintWrapperType {
    Popover = 'popover',
    Tooltip = 'tooltip'
  }
}

export {
  Props
}
