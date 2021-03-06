import classNames from 'classnames'
import React from 'react'

import { Variables } from '../../../common'
import { IntelliIcon, IntelliIconValue } from '../../Icons'
import { Text } from '../../Typographies/Text'
const style = require('./style.scss')

export interface IToastProps {
  heading?: string
  /** Function run when component is mounted (usually a timer if required) */
  onMount?: () => void
  /** Function called when close button is clicked */
  handleClose: (e: React.MouseEvent<HTMLSpanElement>) => void
  /** Type of toast */
  type?: 'success' | 'alert'
  /** Children that will be displayed as toast content */
  children: JSX.Element | string
}

export class Toast extends React.PureComponent<IToastProps> {
  public static defaultProps: Partial<IToastProps> = {
    type: 'success'
  }

  public componentDidMount () {
    const { onMount } = this.props
    if (onMount) { onMount() }
  }

  public render (): JSX.Element {
    const {
      type,
      heading,
      children,
      handleClose
    } = this.props

    let iconName: IntelliIconValue = 'check'
    if (type === 'alert') {
      iconName = 'alert'
    }

    const classes = classNames('toast-content', {
      'no-heading': heading === undefined
    })

    return (
      <div className={classNames(style.ToastClass, type)}>
        <IntelliIcon
          icon={iconName}
          size='xsmall'
          className='toast-icon'
        />

        <div className={classes}>
          <Text weight={Variables.FontWeight.fwSemiBold}>{heading}</Text>
          <div>{children}</div>
        </div>

        <span
          className={classNames('fa-container', 'toast-close-span')}
          onClick={handleClose}
        >
          <IntelliIcon
            icon='cross-small'
            size='xsmall'
            className='toast-close'
          />
        </span>
      </div>
    )
  }
}
