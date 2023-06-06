import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DefaultText, BigText, LargeText} from './Texts';
import {colors} from '../config/colors';

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
  onFollowerPress: Function;
  onFollowingPress: Function;
}): JSX.Element {
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

        <LargeText style={{fontWeight: 'bold', marginBottom: 4}}>
          {props.user.name}
        </LargeText>

        <BigText style={{color: colors.gray, marginBottom: 20}}>
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

export function GitHubUserItem(props: {user: any}): JSX.Element {
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
      }}>
      <Image
        source={{uri: props.user.avatar_url}}
        style={{width: 50, height: 50, marginRight: 20, borderRadius: 25}}
      />
      <DefaultText>{props.user.login}</DefaultText>
    </TouchableOpacity>
  );
}
