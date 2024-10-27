import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Image as Img,
  Platform,
  ImageBackground,
} from 'react-native';
const NoImage = require('./noimage.png');

export const LazyLoadImage = props => {
  const Image = props?.background ? ImageBackground : Img;
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [curentImageSource, setCurentImageSource] = useState(
    props?.source || '',
  );
  const [imageDetail, setImageDetail] = useState(null);
  const [isErrorCount, setIsErrorCount] = useState(0);
  const imagRef = useRef(null);

  const refVar = props?.background ? 'imageRef' : 'ref';
  const obj = {[refVar]: imagRef};

  const onError = e => {
    setIsError(true);
  };
  const onLoadSuccessfully = e => {
    setIsError(false);
  };
  const onLoadStart = e => {
    setIsError(false);
    setLoading(true);
  };
  const onLoadEnd = e => {
    setLoading(false);
  };

  useEffect(() => {
    if (isError && isErrorCount < 3) {
      setIsErrorCount(prev => prev + 1);
      if (imagRef.current) {
        try{
        const nativeProp = Platform.OS === 'ios' ? 'source' : 'src';
        imagRef.current?.setNativeProps({
          [nativeProp]: [
            Img.resolveAssetSource(props?.default || NoImage),
          ],
        });
        setCurentImageSource(props?.default || NoImage);
      }catch(e){
          
      }
      }
    }
  }, [isError]);

  useEffect(() => {
    if (isErrorCount > 2) {
      // force show default image
      if (imagRef.current) {
        try{
          const nativeProp = Platform.OS === 'ios' ? 'source' : 'src';
          imagRef.current?.setNativeProps({
            [nativeProp]: [Img.resolveAssetSource(NoImage)],
          });
          setCurentImageSource(NoImage);
        }catch(e){

        }
      }
    }
  }, [isErrorCount]);

  useEffect(() => {
    setCurentImageSource(props?.source);
    setIsErrorCount(0);
  }, [props?.source]);

  useEffect(() => {
    if (curentImageSource?.uri) {
      Img.getSize(
        curentImageSource?.uri,
        (width, height) => {
          setImageDetail(prev => ({
            ...prev,
            width,
            height,
          }));
        },
        error => {
          setIsError(true);
        },
      );
    } else {
      try{
        const imageDetail1 = Img.resolveAssetSource(curentImageSource);
        if (imageDetail1 && imageDetail1.width) {
          setImageDetail(prev => ({
            ...prev,
            width: imageDetail1.width,
            height: imageDetail1.height,
          }));
        }else{
          setIsError(true);
        }
      }catch(e){
        
      }
    }
  }, [curentImageSource]);

  useEffect(() => {
    if (imageDetail) {
      props?.getSizeDetail ? props?.getSizeDetail(imageDetail) : '';
    }
  }, [imageDetail]);

  return (
    <>
        <View>
           <Image
        {...obj}
        {...props}
        style={[
          (props.autoWidthHightApplied ?? true) && imageDetail?.width
            ? {width: imageDetail.width, height: imageDetail.height}
            : {},
          props.style,
          props?.imageStyle ?? {},
          props?.background ? {flex: 1} : {},
        ]}
        onError={onError}
        onLoad={onLoadSuccessfully}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
        loadingIndicatorSource={
          props?.loading ?? true ? (
            <ActivityIndicator
              animating={true}
              size="large"
              color={props?.color}
            />
          ) : null
        }
      />
       {loading && (props?.loading ?? true) && (
        <View
          style={[
            (props.autoWidthHightApplied ?? true) && imageDetail?.width
              ? {width: imageDetail.width, height: imageDetail.height}
              : {},
            props.style,
            props?.imageStyle ?? {},
            styles.imageWrapper, 
          ]}
          >
          <ActivityIndicator
            animating={true}
            size="large"
            color={props?.color}
          />
        </View>
       )}
        </View>
    </>
  );
};

const styles = StyleSheet.create({
  imageWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
  },
});
