import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useState, useRef } from 'react';
import { Animated, Dimensions, Pressable, TouchableOpacity, View, Easing } from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';

export const VideoPlayer = ({ videoId }: { videoId: string }) : JSX.Element => {
  const [playing, setPlaying] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const [controlDisabled, disableControl] = useState(false);
  const [hasClickedOnce, setHasClickedOnce] = useState<boolean>(false);

  const onChangeState = useCallback(
    (state) => {
      if (state === 'ended') {
        setPlaying(false);
        // may also set a flag for showing replay button
      }
    }
    , []);

  const handlePressPlayButton = () => {
    if (!hasClickedOnce) {
      setHasClickedOnce(true);
      Animated.timing(fadeAnim, {
        easing: Easing.in(Easing.exp),
        toValue: 0,
        duration: 2000,
        useNativeDriver: true
      }).start((finished) => {
        if (finished) {
          toggleControl();
        }
      });
    }
    togglePlaying();
  };
  
  const togglePlaying = useCallback(
    () => {
      setPlaying(prev => !prev);
    }
    , []);

  const toggleControl = useCallback(
    () => {
      disableControl(prev => !prev);
    }
    , []);

  const fadeInControls = () => {
    toggleControl();
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true
    }).start((finished) => {
      if (finished) {
        Animated.timing(fadeAnim, {
          easing: Easing.in(Easing.exp),
          toValue: 0,
          duration: 2000,
          useNativeDriver: true
        }).start((finished) => {
          if (finished) {
            toggleControl();
          }
        });
      }
    });
  };
  
  return (
    <Pressable onPress={fadeInControls}>
      <View 
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
        }}
        pointerEvents='none'
      >
        <YoutubePlayer
          height={Dimensions.get('screen').width * 0.5625}
          play={playing}
          videoId={videoId}
          initialPlayerParams={{
            controls: false,
            rel: false,
            modestbranding: true
          }}
          onChangeState={onChangeState}
        />
      </View>
      <Animated.View
        style={[{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center'
        },
        {
          opacity: fadeAnim // Bind opacity to animated value
        }
        ]}
      >
        <TouchableOpacity onPress={handlePressPlayButton} disabled={controlDisabled}>
          <Ionicons name={playing ? 'pause-sharp' : 'play-sharp'} size={30} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </Pressable>
  );
};