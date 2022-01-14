import React, {
  useState,
  useEffect,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import r from '../../library/request'

import { setImageList } from './actions'

import {
  Box,
} from './style'

const FunctionDefault = function() {
  const dispatch = useDispatch()
  // @ts-ignore
  const { imageList } = useSelector(state => state)
  const [list, setList] = useState(imageList)

  const getData = async () => {
    if (imageList === list && list.length) return
    // 两次请求
    const rst = await r({
      url: 'http://172.16.8.222:9529/mock/155/information/api/list',
    })
    dispatch(setImageList(rst.data))
    setList(rst.data)
  }

  useEffect(() => { getData() }, [])

  useEffect(() => {
    if (list !== imageList) setList(imageList)
  }, [imageList])

  return (
    <Box>
      <ul>
        {
          list?.map(
            (v, vi) => (
              <li key={`${v.id}_${vi}`}>
                <span>{v.date}</span>
                <img
                  src={v.cover_image_url}
                  alt={v.title}
                />
                <p>{v.description}</p>
              </li>
            )
          )
        }
      </ul>
    </Box>
  )
}

FunctionDefault.getInitialProps = async ({ store }) => {
  const rst = await r({
    url: 'http://172.16.8.222:9529/mock/155/information/api/list',
  })
  store.dispatch(setImageList(rst.data))
  return store
}

export default FunctionDefault;
