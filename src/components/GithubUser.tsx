import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {DefaultText, BigText, LargeText} from './Texts';

export function GitHubUser(props: {
  error: string;
  loading: boolean;
  user: any;
}): JSX.Element {
  console.log(props);
  if (props.loading) {
    return <ActivityIndicator color={'#555555'} size={40} />;
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

        <LargeText style={{fontWeight: 'bold', marginBottom: 4}}>
          {props.user.name}
        </LargeText>

        <BigText style={{color: '#888888', marginBottom: 20}}>
          {props.user.login}
        </BigText>

        <DefaultText style={{marginBottom: 20, textAlign: 'center'}}>
          {props.user.bio}
        </DefaultText>

        <View style={{flexDirection: 'row', alignSelf: 'center'}}>
          <TouchableOpacity style={{marginRight: 20}}>
            <DefaultText style={{fontWeight: 'bold'}}>
              {props.user.followers}
            </DefaultText>
            <DefaultText style={{color: '#888888'}}> followers</DefaultText>
          </TouchableOpacity>

          <TouchableOpacity>
            <DefaultText style={{fontWeight: 'bold'}}>
              {props.user.following}
            </DefaultText>
            <DefaultText style={{color: '#888888'}}> following</DefaultText>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return <></>;
}
