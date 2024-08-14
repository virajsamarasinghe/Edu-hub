import { AuthContext } from '../../contexts/AuthProvider';
import { useForm } from 'react-hook-form';
import { useContext } from 'react';

const UpdateProfile = () => {
  const { updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const address = data.address;
    const name = data.name;
    const photoFile = data.photoURL[0];

    if (photoFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const photoURL = reader.result;
        updateUserProfile(name, photoURL, address)
          .then(() => {
            // Profile updated!
            alert('Profile updated successfully');
          })
          .catch((error) => {
            // An error occurred
            console.error('Error updating profile:', error);
            alert('Failed to update profile. Please try again.');
          });
      };
      reader.readAsDataURL(photoFile);
    } else {
      updateUserProfile(name, null, address)
        .then(() => {
          // Profile updated!
          alert('Profile updated successfully');
        })
        .catch((error) => {
          // An error occurred
          console.error('Error updating profile:', error);
          alert('Failed to update profile. Please try again.');
        });
    }
  };

  return (
    <div className='h-screen max-w-md mx-auto flex items-center justify-center '>
      <div className='card shrink-0 w-full max-w-sm shadow-2xl bg-base-100'>
        <form className='card-body' onSubmit={handleSubmit(onSubmit)}>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Name</span>
            </label>
            <input
              type='text'
              {...register('name', { required: true })}
              placeholder='Your name'
              className='input input-bordered'
            />
            {errors.name && <span className='text-red-500'>Name is required</span>}
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Address</span>
            </label>
            <input
              type='text'
              {...register('address', { required: true })}
              placeholder='Your address'
              className='input input-bordered'
            />
            {errors.address && <span className='text-red-500'>Address is required</span>}
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text'>Upload Photo</span>
            </label>
            <input
              type='file'
              {...register('photoURL')}
              className='file-input w-full mt-1'
            />
          </div>
          <div className='form-control mt-6'>
            <input type='submit' value={'Update'} className='btn bg-pink text-white' />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;