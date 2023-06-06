import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {colors} from '../config/colors';
import {BigText, DefaultText, LargeText} from './Texts';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

function FCountButton(props: any) {
  return (
    <TouchableOpacity
      style={[{flexDirection: 'row'}, props.style]}
      onPress={props.onPress}>
      <DefaultText style={{fontWeight: 'bold'}}>{props.count}</DefaultText>
      <DefaultText style={{color: colors.gray}}> {props.label}</DefaultText>
    </TouchableOpacity>
  );
}

export function GitHubUser(props: {
  error: string;
  user: any;
  loading: boolean;
  onFollowerPress: Function;
  onFollowingPress: Function;
}): JSX.Element {
  if (props.loading) {
    return (
      <SkeletonPlaceholder>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{width: 50, height: 50, borderRadius: 25}} />
          <View style={{marginLeft: 20}}>
            <View style={{width: 120, height: 20, borderRadius: 4}} />
            <View
              style={{marginTop: 6, width: 80, height: 20, borderRadius: 4}}
            />
          </View>
        </View>
      </SkeletonPlaceholder>
    );
  }
  if (props.error.length > 0) {
    return (
      <DefaultText style={{alignSelf: 'center', color: '#888888'}}>
        {props.error}
      </DefaultText>
    );
  }

  if (props.user != null) {
    return (
      <View style={{alignItems: 'center'}}>
        <Image
          source={{uri: props.user.avatar_url}}
          style={{width: 200, height: 200, borderRadius: 100, marginBottom: 30}}
        />

        <LargeText
          style={{fontWeight: 'bold', marginBottom: 4, textAlign: 'center'}}>
          {props.user.name}
        </LargeText>

        <BigText
          style={{color: colors.gray, marginBottom: 20, textAlign: 'center'}}>
          {props.user.login}
        </BigText>

        <DefaultText style={{marginBottom: 20, textAlign: 'center'}}>
          {props.user.bio}
        </DefaultText>

        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <FCountButton
            style={{marginRight: 20}}
            count={props.user.followers}
            label={'followers'}
            onPress={props.onFollowerPress}
          />
          <FCountButton
            count={props.user.following}
            label={'following'}
            onPress={props.onFollowingPress}
          />
        </View>
      </View>
    );
  }

  return <></>;
}

export function GitHubUserItem(props: any): JSX.Element {
  return (
    <TouchableOpacity style={githubUserItemStyles.root} onPress={props.onPress}>
      <Image
        source={{uri: props.user.avatar_url}}
        style={githubUserItemStyles.avatar}
      />
      <DefaultText>{props.user.login}</DefaultText>
    </TouchableOpacity>
  );
}
const githubUserItemStyles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {width: 50, height: 50, marginRight: 20, borderRadius: 25},
});
