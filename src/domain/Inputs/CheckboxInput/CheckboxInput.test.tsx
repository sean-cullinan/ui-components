import { shallow } from 'enzyme'
import React from 'react'

import { FontAwesomeIcon } from '../../Icons'
import { CheckboxInput } from './CheckboxInput'

describe('<CheckboxInput />', () => {
  it(`should render a checkbox input without button`, () => {
    const wrapper = shallow(
      <CheckboxInput
        name='test-input'
        label='Hey I am a test string'
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it(`should render a checked checkbox input without button`, () => {
    const wrapper = shallow(
      <CheckboxInput
        name='test-input'
        value='true'
        label='Hey I am a test string'
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it(`should render a checkbox input with button`, () => {
    const wrapper = shallow(
      <CheckboxInput
        name='test-button-input'
        label='Hey I am a test string'
        isButton
      />
    )

    expect(wrapper).toMatchSnapshot()
  })

  it(`should render a checkbox input with a component as the label`, () => {
    const wrapper = shallow(
      <CheckboxInput
        name='test-jsx-input'
        label={<FontAwesomeIcon type='solid' icon='star' />}
      />
    )

    expect(wrapper).toMatchSnapshot()
  })
})
