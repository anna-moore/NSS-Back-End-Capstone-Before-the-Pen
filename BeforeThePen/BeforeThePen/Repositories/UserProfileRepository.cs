using Microsoft.Data.SqlClient;
using BeforeThePen.Models;
using Microsoft.Extensions.Configuration;
using static BeforeThePen.Utils.DbUtlis;
using System.Collections.Generic;

namespace BeforeThePen.Repositories
{
    public class UserProfileRepository : BaseRepository, IUserProfileRepository
    {
        public UserProfileRepository(IConfiguration configuration) : base(configuration) { }

        public UserProfile GetByFirebaseUserId(string firebaseUserId)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirebaseUserId, up.DisplayName, up.FirstName, up.LastName, up.Email, 
                               up.DateCreated, up.ImageURL
                          FROM UserProfile up                             
                         WHERE up.FirebaseUserId = @FirebaseuserId";

                    DbUtils.AddParameter(cmd, "@FirebaseUserId", firebaseUserId);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();
                    if (reader.Read())
                    {
                        userProfile = new UserProfile()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                            DisplayName = DbUtils.GetString(reader, "DisplayName"),
                            FirstName = DbUtils.GetString(reader, "FirstName"),
                            LastName = DbUtils.GetString(reader, "LastName"),
                            Email = DbUtils.GetString(reader, "Email"),
                            DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                            ImageURL = DbUtils.GetString(reader, "ImageURL")
                        };
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public List<UserProfile> GetAll()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                        SELECT up.Id, up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName,
                        up.Email, up.DateCreated, up.ImageURL                       
                        FROM UserProfile up";

                    var reader = cmd.ExecuteReader();
                    var userProfiles = new List<UserProfile>();
                    while (reader.Read())
                    {
                        userProfiles.Add(NewUserProfileFromDb(reader));
                    }
                    reader.Close();
                    return userProfiles;
                }
            }
        }

        public UserProfile GetByUserProfileId(int id)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"
                                        SELECT up.Id, Up.FirebaseUserId, up.FirstName, up.LastName, up.DisplayName, 
                                               up.Email, up.DateCreated, up.ImageURL                             
                                        FROM UserProfile up                         
                                        WHERE up.Id = @Id";

                    DbUtils.AddParameter(cmd, "@Id", id);

                    UserProfile userProfile = null;

                    var reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        userProfile = NewUserProfileFromDb(reader);
                    }
                    reader.Close();

                    return userProfile;
                }
            }
        }

        public void Add(UserProfile userProfile)
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @"INSERT INTO UserProfile (FirebaseUserId, DisplayName, FirstName, LastName, Email, ImageURL, DateCreated )
                                        OUTPUT INSERTED.ID
                                        VALUES (@FirebaseUserId, @DisplayName, @FirstName, @LastName, @Email, @ImageURL, @DateCreated)";
                    DbUtils.AddParameter(cmd, "@FirebaseUserId", userProfile.FirebaseUserId);
                    DbUtils.AddParameter(cmd, "@DisplayName", userProfile.DisplayName);
                    DbUtils.AddParameter(cmd, "@FirstName", userProfile.FirstName);
                    DbUtils.AddParameter(cmd, "@LastName", userProfile.LastName);
                    DbUtils.AddParameter(cmd, "@Email", userProfile.Email);
                    DbUtils.AddParameter(cmd, "@ImageURL", userProfile.ImageURL);
                    DbUtils.AddParameter(cmd, "@DateCreated", userProfile.DateCreated);

                    userProfile.Id = (int)cmd.ExecuteScalar();

                    //need to add the userprofile ID
                    /*  cmd.CommandText = @"  INSERT INTO Layout ([UserProfileId], [Type], [TimeEstimate], [description])
                                            VALUES
                                              (userProfile.Id,  'Cover Page', 60, 'The Cover Page contains art of this months theme and a title of the month.'),
                                              (userProfile.Id,  'Calender', 30, 'The Calendar page contains a grid or a list of dates. This layout may also have a quote or note section.'),
                                              (userProfile.Id,  'Quote Page', 60, 'This spread contains typography and is often located along side the cover page.'),
                                              (userProfile.Id,  'Habit Tracker', 40, 'Habit Tracker are often mini calendar grids so determine how often a habit is being done.'),
                                              (userProfile.Id,  'Mood Tracker', 40, 'Mood Trackers can be a drawing that match the theme of the month and record the highs and lows with uses of different color.'),
                                              (userProfile.Id,  'Vertical Weekly', 30, 'Weekly spreads in a vertical format are great for writing out events and task.'),
                                              (userProfile.Id,  'Horizontal Weekly', 30, 'Weekly spreads in a horizontal format are great for jotting down thoughts about the day.');";*/
                }
            }
        }

        private UserProfile NewUserProfileFromDb(SqlDataReader reader)
        {
            return new UserProfile()
            {
                Id = DbUtils.GetInt(reader, "Id"),
                FirebaseUserId = DbUtils.GetString(reader, "FirebaseUserId"),
                FirstName = DbUtils.GetString(reader, "FirstName"),
                LastName = DbUtils.GetString(reader, "LastName"),
                DisplayName = DbUtils.GetString(reader, "DisplayName"),
                Email = DbUtils.GetString(reader, "Email"),
                DateCreated = DbUtils.GetDateTime(reader, "DateCreated"),
                ImageURL = DbUtils.GetString(reader, "ImageURL"),

            };
        }
    }
}
