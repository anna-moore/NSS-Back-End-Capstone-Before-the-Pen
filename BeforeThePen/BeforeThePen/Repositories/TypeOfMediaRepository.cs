using BeforeThePen.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using static BeforeThePen.Utils.DbUtlis;

namespace BeforeThePen.Repositories
{
    public class TypeOfMediaRepository : BaseRepository, ITypeOfMediaRepository
    {
        public TypeOfMediaRepository(IConfiguration configuration) : base(configuration) { }

        //getAll Types of Media
        public List<TypeOfMedia> GetAllTypeOfMedia()
        {
            using (var conn = Connection)
            {
                conn.Open();
                using (var cmd = conn.CreateCommand())
                {
                    cmd.CommandText = @" SELECT tm.id, tm.Type                                               
                                         FROM TypeOfMedia tm";


                    var reader = cmd.ExecuteReader();
                    var resources = new List<TypeOfMedia>();
                    while (reader.Read())
                    {
                        resources.Add(new TypeOfMedia()
                        {
                            Id = DbUtils.GetInt(reader, "Id"),
                            Type = DbUtils.GetString(reader, "Type")
                        });
                    }

                    reader.Close();

                    return resources;
                }
            }

        }

    }
}
