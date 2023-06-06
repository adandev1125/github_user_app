import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {colors} from '../config/colors';
import {BigText, DefaultText, LargeText} from './Text';

// Button component displaying following and followers count
interface FCountButtonProps {
  style?: any;
  count: number;
  label: string;
  onPress: (event: GestureResponderEvent) => void;
}
function FCountButton(props: FCountButtonProps) {
  return (
    <TouchableOpacity
      style={[{flexDirection: 'row'}, props.style]}
      onPress={props.onPress}>
      <DefaultText style={{fontWeight: 'bold'}}>{props.count}</DefaultText>
      <DefaultText style={{color: colors.gray}}> {props.label}</DefaultText>
    </TouchableOpacity>
  );
}

// Github user profile component,
// showing avatar, name, username, bio, and following & followers count
interface GitHubUserProps {
  error: string;
  user: any;
  loading: boolean;
  onFollowerPress: (event: GestureResponderEvent) => void;
  onFollowingPress: (event: GestureResponderEvent) => void;
}
export function GitHubUser(props: GitHubUserProps): JSX.Element {
  // Render skeleton screen while loading
  if (props.loading) {
    return (
      <SkeletonPlaceholder>
        <View style={githubUserStyles.root}>
          <View style={githubUserStyles.avatar} />

          <View style={githubUserStyles.namePlaceholder} />
          <View style={githubUserStyles.usernamePlaceholder} />
          <View style={githubUserStyles.bioPlaceholder} />

          <View style={{flexDirection: 'row', alignSelf: 'center'}}>
            <View style={githubUserStyles.followerPlaceholder} />
            <View style={githubUserStyles.followingPlaceholder} />
          </View>
        </View>
      </SkeletonPlaceholder>
    );
  }

  // If error occurs, display the error string
  if (props.error.length > 0) {
    return (
      <DefaultText style={{alignSelf: 'center', color: colors.gray}}>
        {props.error}
      </DefaultText>
    );
  }

  // Render user profile
  if (props.user != null) {
    return (
      <View style={githubUserStyles.root}>
        <Image
          source={{uri: props.user.avatar_url}}
          style={githubUserStyles.avatar}
        />

        <LargeText style={githubUserStyles.name}>{props.user.name}</LargeText>

        <BigText style={githubUserStyles.username}>{props.user.login}</BigText>

        <DefaultText style={githubUserStyles.bio}>{props.user.bio}</DefaultText>

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
const githubUserStyles = StyleSheet.create({
  root: {alignItems: 'center'},
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 30,
  },
  namePlaceholder: {
    width: 200,
    height: 48.5,
    marginBottom: 4,
    borderRadius: 100,
  },
  name: {fontWeight: 'bold', marginBottom: 4, textAlign: 'center'},
  usernamePlaceholder: {
    width: 200,
    height: 32.5,
    marginBottom: 20,
    borderRadius: 100,
  },
  username: {color: colors.gray, marginBottom: 20, textAlign: 'center'},
  bioPlaceholder: {
    width: 300,
    height: 21.5,
    marginBottom: 20,
    borderRadius: 100,
  },
  bio: {marginBottom: 20, textAlign: 'center'},
  followerPlaceholder: {
    width: 100,
    height: 21.5,
    marginRight: 20,
    borderRadius: 100,
  },
  followingPlaceholder: {width: 100, height: 21.5, borderRadius: 100},
});

// Component for showing GitHub users on list
// Displays avatar and username
interface GitHubUserItemProps {
  user: {
    avatar_url: string;
    login: string;
  };
  onPress: (event: GestureResponderEvent) => void;
}
export function GitHubUserItem(props: GitHubUserItemProps): JSX.Element {
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
