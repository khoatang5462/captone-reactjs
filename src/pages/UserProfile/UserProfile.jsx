import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { authServices } from '../../services/AuthServices.jsx';
import { PATH } from '../../Constants/PATH';
import { FaCamera, FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import { validateProfile } from '../../utils/validation';

export const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    twitter: '',
    linkedin: '',
    instagram: ''
  });

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    try {
      const validationErrors = validateProfile(userData);
      if (Object.keys(validationErrors).length > 0) {
        setError(validationErrors.join('\n'));
        return;
      }

      const formData = new FormData();
      formData.append('profileData', JSON.stringify({
        ...userData,
        profileImage: imagePreview ? true : false,
        socialLinks
      }));
      if (profileImage) {
        formData.append('profileImage', profileImage);
      }
      
      await authServices.UpdateProfile(id, formData);
      setIsEditing(false);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await authServices.checkAuth();
        fetchUserData();
      } catch (err) {
        navigate('/login');
      }
    };

    const fetchUserData = async () => {
      try {
        const response = await axios.get(PATH.USER.GET_PROFILE(id));
        setUserData(response.data);
        if (response.data.socialLinks) {
          setSocialLinks(response.data.socialLinks);
        }
      } catch (err) {
        setError("Failed to fetch user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [id, navigate]);

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="relative w-24 h-24 mr-4">
                <img 
                  src={imagePreview || userData?.profileImage || '/default-profile.png'} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover border-4 border-white shadow"
                />
                {isEditing && (
                  <label 
                    htmlFor="profile-upload"
                    className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-lg cursor-pointer hover:bg-gray-100 transition-colors"
                  >
                    <FaCamera className="text-gray-600" />
                    <input
                      id="profile-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">{userData?.username}</h1>
                <p className="text-gray-500">Member since {new Date(userData?.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className={`px-6 py-2 rounded-full transition-all ${
                isEditing 
                  ? 'bg-red-500 hover:bg-red-600 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'
              }`}
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        <div className="p-6">
          {isEditing ? (
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={userData?.description || ''}
                  onChange={(e) => setUserData({...userData, description: e.target.value})}
                  className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  rows="4"
                  minLength="50"
                  maxLength="500"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Languages</label>
                  <input
                    value={userData?.languages?.join(', ') || ''}
                    onChange={(e) => setUserData({...userData, languages: e.target.value.split(',')})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    pattern="[a-zA-Z, ]+"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <input
                    value={userData?.skills?.join(', ') || ''}
                    onChange={(e) => setUserData({...userData, skills: e.target.value.split(',')})}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                    pattern="[a-zA-Z0-9, ]+"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Social Media Links</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center">
                    <FaFacebook className="mr-2 text-blue-600 text-xl" />
                    <input
                      type="url"
                      value={socialLinks.facebook}
                      onChange={(e) => setSocialLinks({...socialLinks, facebook: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Facebook URL"
                    />
                  </div>
                  <div className="flex items-center">
                    <FaTwitter className="mr-2 text-blue-400 text-xl" />
                    <input
                      type="url"
                      value={socialLinks.twitter}
                      onChange={(e) => setSocialLinks({...socialLinks, twitter: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Twitter URL"
                    />
                  </div>
                  <div className="flex items-center">
                    <FaLinkedin className="mr-2 text-blue-700 text-xl" />
                    <input
                      type="url"
                      value={socialLinks.linkedin}
                      onChange={(e) => setSocialLinks({...socialLinks, linkedin: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="LinkedIn URL"
                    />
                  </div>
                  <div className="flex items-center">
                    <FaInstagram className="mr-2 text-pink-500 text-xl" />
                    <input
                      type="url"
                      value={socialLinks.instagram}
                      onChange={(e) => setSocialLinks({...socialLinks, instagram: e.target.value})}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="Instagram URL"
                    />
                  </div>
                </div>
              </div>

              <button
                onClick={handleSaveProfile}
                disabled={isSaving}
                className={`w-full py-3 rounded-lg text-lg font-semibold transition-all ${
                  isSaving 
                    ? 'bg-gray-300 cursor-not-allowed' 
                    : 'bg-green-500 hover:bg-green-600 text-white'
                }`}
              >
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">About Me</h2>
                <p className="text-gray-600 leading-relaxed">{userData?.description}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Languages</h2>
                  <p className="text-gray-600">{userData?.languages?.join(', ')}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">Skills</h2>
                  <p className="text-gray-600">{userData?.skills?.join(', ')}</p>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Social Media</h2>
                <div className="flex space-x-4">
                  {socialLinks.facebook && (
                    <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
                      <FaFacebook className="text-blue-600" size={28} />
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
                      <FaTwitter className="text-blue-400" size={28} />
                    </a>
                  )}
                  {socialLinks.linkedin && (
                    <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
                      <FaLinkedin className="text-blue-700" size={28} />
                    </a>
                  )}
                  {socialLinks.instagram && (
                    <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="hover:opacity-75 transition-opacity">
                      <FaInstagram className="text-pink-500" size={28} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
